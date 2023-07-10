import {
	pipe,
	groupBy,
	keys,
	length,
	find,
	filter,
	chain,
	map,
	sort,
	take,
	without,
	range,
	concat,
	any,
	none,
	defaultTo,
	isNil,
	isNotNil,
	flatten,
	sortBy,
	sortWith,
	ascend
} from 'ramda';
import type { Availability, Patient, Slot, Therapist } from './types';

//  > 0 = assigned
// -1 = unavailable
// -2 = unassigned
// < -2 = positioning
export class Algorithm {
	private readonly _groups: number;
	private readonly _slots: Slot[];
	private readonly _therapists: Therapist[];
	private readonly _patients: Patient[];
	private readonly _pids: number[];

	constructor(slots: Slot[], therapists: Therapist[], patients: Patient[]) {
		this._slots = slots;
		this._therapists = therapists;
		this._patients = patients;
		this._groups = this.getGroups(this._slots);
		this._pids = this.getPatientIds(this._patients);
	}

	public calculate() {
		// keep track of chromosome to be merged later
		const chromosomes: Chromosome[] = [];

		// keep track of patient ids that are not assigned
		const unassignedIds: number[] = [];

		// create a set of chromosomes for each group
		for (let i = 1; i <= this._groups; i++) {
			// capture the length of this chromosome
			const chromosomeLength: number = this.getChromosomeLength(this._therapists, i);

			// check if there are any pids leftout (less slots than pids)
			const remainderIds: number[] =
				this._pids.length > chromosomeLength
					? (this.getRandomPidRemainder(this._pids, unassignedIds, chromosomeLength) as number[])
					: [];

			// add remainder to the list of unassigned items
			unassignedIds.push(...remainderIds);

			// calculate if there are slots available for positioning
			const positioningIds: number[] =
				this._pids.length < chromosomeLength
					? this.getPositioningPids(this._pids.length, chromosomeLength)
					: [];

			// get the list of ids that will get assigned to the planning.
			const worksetIds = this.getWorksetIds(this._pids, positioningIds, unassignedIds);

			// get valid permutations for this workset
			let permutations = this.getPermutations(worksetIds, i);

			// get a subset which excludes already assigned therapist/patient combinations
			permutations = this.getTherapistPatientSubsetPermutations(chromosomes, permutations);

			// get a subset which excludes positioning combinations
			permutations = this.getPositioningPermutations(chromosomes, permutations);

			// get a list of therapist ids, ordered by whether they have a dedicated therapist
			const therapistIds = this.getSortedTherapistIds(this._therapists);

			// build the chromosome
			const chromosome: Chromosome = {
				genes: []
			};

			// Start assigning
			for (let j = 0; j < chromosomeLength; j++) {
				for (let k = 0; k < therapistIds.length; k++) {
					// If no permutations left, go on to the next therapist
					if (permutations.length === 0) continue;

					// get the current therapist
					const therapistId = therapistIds[k];
					const therapist = find(
						(t: Therapist) => t.id === therapistId,
						this._therapists
					) as Therapist;

					// get the subset of permutations for this therapist
					const subset = filter((p: Permutation) => p.therapist === therapistId, permutations);

					// if no subset, go on to the next therapist
					if (subset.length === 0) continue;

					// check if the therapist has a dedicated patient
					const dedicated = isNotNil(therapist?.dedicated)
						? filter((p: Permutation) => p.patient === therapist.dedicated, subset)
						: [];

					// select a permutation to assign
					const permutation =
						dedicated.length > 0
							? dedicated[Math.floor(Math.random() * dedicated.length)]
							: subset[Math.floor(Math.random() * subset.length)];

					// add a gene to the chromosome
					chromosome.genes.push({
						slot: permutation.slot,
						therapist: permutation.therapist,
						patient: permutation.patient
					});

					// remove taken timeslot for the current therapist from the permutation subset
					const invalidatedTherapists = filter(
						(p: Permutation) =>
							p.therapist === permutation.therapist && p.slot === permutation.slot,
						permutations
					);

					// remove taken patient from the permutation subset
					const invalidatedPatients = filter((p: Permutation) => p.patient === permutation.patient)(
						permutations
					);

					// remove taken positioning from the permutation subset
					const invalidatedSlotPositioning =
						permutation.patient < -2
							? filter((p: Permutation) => p.slot === permutation.slot && p.patient < -2)(
									permutations
							  )
							: [];

					// remove all positioning from the therapist which got currently assigned to positioning
					const invalidatedTherapistPositioning =
						permutation.patient < -2
							? filter(
									(p: Permutation) => p.therapist === permutation.therapist && p.patient < -2,
									permutations
							  )
							: [];

					// apply it all to the subset
					permutations = pipe(
						without(invalidatedTherapists),
						without(invalidatedPatients),
						without(invalidatedSlotPositioning),
						without(invalidatedTherapistPositioning)
					)(permutations);
				}
			}

			chromosomes.push(chromosome);
		}

		// merge chromosomes into a single chromosome
		let single = chain((c: Chromosome) => c.genes, chromosomes);

		// add unavailable slots
		const unavailable: Gene[] = chain(
			(t: Therapist) =>
				chain(
					(a: Availability) =>
						!a.available ? [{ slot: a.slot, therapist: t.id, patient: -1 }] : [],
					t.availabilities
				),
			this._therapists
		);

		single = [...single, ...unavailable];

		// add unassigned slots to the array
		for (const slot of this._slots) {
			for (const therapist of this._therapists) {
				if (none((g: Gene) => g.slot === slot.id && g.therapist === therapist.id, single)) {
					single.push({ slot: slot.id, therapist: therapist.id, patient: -2 });
				}
			}
		}

		single = sortWith([ascend((g: Gene) => g.slot), ascend((g: Gene) => g.therapist)], single);

		const finalizedChromosome: Chromosome = {
			genes: single
		};

		const solution: Solution = {
			individual: finalizedChromosome,
			unassigned: unassignedIds
		};

		return solution;
	}

	// refactor
	private getSortedTherapistIds(therapists: Therapist[]) {
		const ids = pipe(
			sortBy((t: Therapist) => isNotNil(t.dedicated) && t.dedicated > 0),
			map((t: Therapist) => t.id)
		)(therapists);

		return ids;
	}

	// refactor
	private getPositioningPermutations(chromosomes: Chromosome[], permutations: Permutation[]) {
		const positioning = pipe(
			map((c: Chromosome) => filter((g: Gene) => g.patient < -2, c.genes)),
			flatten,
			map((g: Gene) => g.therapist)
		)(chromosomes);

		const subset = filter(
			(p: Permutation) => none((tid: number) => p.therapist === tid, positioning),
			permutations
		);

		return subset;
	}

	// refactor
	private getTherapistPatientSubsetPermutations(
		chromosomes: Chromosome[],
		permutations: Permutation[]
	) {
		// get combinations that are already assigned to the chromosomes
		const combinations = pipe(
			map((c: Chromosome) =>
				map((g: Gene) => {
					const combo: Combination = {
						therapist: g.therapist,
						patient: g.patient
					};

					return combo;
				}, c.genes)
			),
			flatten
		)(chromosomes);

		// make a subset of permutations that have not already been combined before
		const subset = filter(
			(p: Permutation) =>
				none(
					(c: Combination) => p.therapist === c.therapist && p.patient === c.patient,
					combinations
				),
			permutations
		);

		return subset;
	}

	// Refactor
	private getPermutations(worksetIds: number[], group: number) {
		const permutations: Permutation[] = [];
		const slots = filter((s: Slot) => s.group === group, this._slots);

		for (const slot of slots) {
			for (const therapist of this._therapists) {
				for (const wId of worksetIds) {
					const ta = any(
						(a: Availability) => a.slot === slot.id && a.available,
						therapist.availabilities
					);

					let pa = true;

					if (wId === -1) {
						pa = false;
					} else if (wId < -1) {
						pa = true;
					} else {
						pa = pipe(
							find(
								(p: Patient) =>
									p.id === wId && none((e: number) => e === wId, defaultTo([], therapist.excluded))
							),
							(p: Patient | undefined) =>
								isNil(p)
									? false
									: any((a: Availability) => a.slot === slot.id && a.available, p.availabilities)
						)(this._patients);
					}

					if (ta && pa) {
						permutations.push({
							group: group,
							slot: slot.id,
							therapist: therapist.id,
							patient: wId
						});
					}
				}
			}
		}

		return permutations;
	}

	private getWorksetIds(patientIds: number[], positionIds: number[], remainderIds: number[]) {
		return pipe(concat(positionIds))(without(remainderIds, patientIds));
	}

	private getPositioningPids(pidsLength: number, chromosomeLength: number) {
		return map((p) => -p - 2, range(1, chromosomeLength - pidsLength));
	}

	private getRandomPidRemainder(pids: number[], unassigned: number[], select: number) {
		return pipe(
			sort(() => Math.random() - 0.5),
			take(select)
		)(without(unassigned, pids));
	}

	private getPatientIds(patients: Patient[]) {
		return map((patient: Patient) => patient.id, patients);
	}

	private getChromosomeLength(therapists: Therapist[], group: number) {
		return pipe(
			chain((t: Therapist) => t.availabilities),
			filter((a: Availability) => a.available && this.getGroupForSlot(a.slot) === group),
			length
		)(therapists);
	}

	private getGroups(slots: Slot[]) {
		return pipe(
			groupBy((s: Slot) => s.group.toString()),
			keys,
			length
		)(slots);
	}

	private getGroupForSlot(slot: number) {
		const s = find((s: Slot) => s.id === slot, this._slots) as Slot;
		return s?.group;
	}
}

interface Permutation {
	group: number;
	slot: number;
	therapist: number;
	patient: number;
}

export interface Solution {
	unassigned: number[];
	individual: Chromosome;
}

interface Chromosome {
	genes: Gene[];
}

interface Gene {
	slot: number;
	therapist: number;
	patient: number;
}

interface Combination {
	therapist: number;
	patient: number;
}
