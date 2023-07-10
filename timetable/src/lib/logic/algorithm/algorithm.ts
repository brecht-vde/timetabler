import {
	chain,
	either,
	filter,
	find,
	isEmpty,
	isNil,
	map,
	pipe,
	uniq,
	length,
	sortBy,
	isNotNil,
	sort,
	take,
	without,
	range,
	concat,
	any,
	none,
	defaultTo,
	flatten,
	sortWith,
	ascend
} from 'ramda';
import type { Availability, Patient, Slot, Therapist } from '../domain/types';
import type { Chromosome, Combination, Gene, Genome, Permutation } from './types';

export class Algorithm {
	private readonly _slots: Slot[];
	private readonly _therapists: Therapist[];
	private readonly _patients: Patient[];
	private readonly _groups: number[];
	private readonly _pids: number[];

	constructor(slots: Slot[], therapists: Therapist[], patients: Patient[]) {
		if (either(isNil, isEmpty)(slots)) throw new Error("slots can't be null or empty.");
		if (either(isNil, isEmpty)(therapists)) throw new Error("therapists can't be null or empty.");
		if (either(isNil, isEmpty)(patients)) throw new Error("patients can't be null or empty.");

		this._slots = slots;
		this._therapists = this.getSortedTherapists(therapists);
		this._patients = patients;
		this._groups = this.getGroups();
		this._pids = this.getPids();
	}

	public execute() {
		const chromosomes: Chromosome[] = [];
		const remainders: number[] = [];

		this.buildGroupChromosomes(chromosomes, remainders);
		this.buildUnavailableChromosomes(chromosomes);

		let chromosome = this.flattenChromosomes(chromosomes);
		this.addUnassignedGenes(chromosome);

		chromosome = this.sortChromosome(chromosome);

		const genome: Genome = {
			individual: chromosome,
			unassigned: remainders
		};

		return genome;
	}

	private flattenChromosomes = (chromosomes: Chromosome[]) => {
		const flattened = chain((c: Chromosome) => c.genes, chromosomes);
		const chromosome: Chromosome = { genes: flattened };
		return chromosome;
	};

	private sortChromosome = (chromosome: Chromosome) => {
		const sorted = sortWith(
			[ascend((g: Gene) => g.slot), ascend((g: Gene) => g.therapist)],
			chromosome.genes
		);

		return { genes: sorted };
	};

	private addUnassignedGenes = (chromosome: Chromosome) => {
		for (const slot of this._slots) {
			for (const therapist of this._therapists) {
				if (
					none((g: Gene) => g.slot === slot.id && g.therapist === therapist.id, chromosome.genes)
				) {
					chromosome.genes.push({ slot: slot.id, therapist: therapist.id, patient: -2 });
				}
			}
		}
	};

	private buildUnavailableChromosomes = (chromosomes: Chromosome[]) => {
		const unavailable: Gene[] = chain(
			(t: Therapist) =>
				chain(
					(a: Availability) =>
						!a.available ? [{ slot: a.slot, therapist: t.id, patient: -1 }] : [],
					t.availabilities
				),
			this._therapists
		);

		chromosomes.push({ genes: unavailable });
	};

	private buildGroupChromosomes = (chromosomes: Chromosome[], remainders: number[]) => {
		for (const group of this._groups) {
			const chromosomeLength = this.getChromosomeLengthByGroup(group);

			this.setRemainder(remainders, chromosomeLength);

			const positioning = this.getPositioning(chromosomeLength);
			const assignees = this.getAssignees(remainders, positioning);

			let permutations = this.getPermutations(assignees, group);
			permutations = this.getTherapistPatientSubsetPermutations(chromosomes, permutations);
			permutations = this.getPositioningPermutations(chromosomes, permutations);

			const chromosome: Chromosome = {
				genes: []
			};

			for (let i = 0; i < chromosomeLength; i++) {
				for (const therapist of this._therapists) {
					if (permutations.length === 0) continue;

					const subset = filter((p: Permutation) => p.therapist === therapist.id, permutations);

					if (subset.length === 0) continue;

					const dedicated = isNotNil(therapist?.dedicated)
						? filter((p: Permutation) => p.patient === therapist.dedicated, subset)
						: [];

					const permutation =
						dedicated.length > 0
							? dedicated[Math.floor(Math.random() * dedicated.length)]
							: subset[Math.floor(Math.random() * subset.length)];

					chromosome.genes.push({
						slot: permutation.slot,
						therapist: permutation.therapist,
						patient: permutation.patient
					});

					permutations = this.modifyPermutations(permutations, permutation);
				}
			}

			chromosomes.push(chromosome);
		}
	};

	private getGroups = () => {
		return uniq(map((s: Slot) => s.group, this._slots));
	};

	private getPids = () => {
		return map((p: Patient) => p.id, this._patients);
	};

	private getSlotByGroup = (slot: number) => {
		return find((s: Slot) => s.id === slot, this._slots)?.group;
	};

	private getChromosomeLengthByGroup = (group: number) => {
		return pipe(
			chain((t: Therapist) => t.availabilities),
			filter((a: Availability) => a.available && this.getSlotByGroup(a.slot) === group),
			length
		)(this._therapists);
	};

	private getSortedTherapists = (therapists: Therapist[]) => {
		return sortBy((t: Therapist) => isNotNil(t.dedicated) && t.dedicated > 0, therapists);
	};

	private setRemainder = (remainders: number[], chromosomeLength: number) => {
		const select = this._pids.length - chromosomeLength;

		const remainder = (
			select > 0
				? pipe(
						sort(() => Math.random() - 0.5),
						take(select)
				  )(without(remainders, this._pids))
				: []
		) as number[];

		remainders.push(...remainder);
	};

	private getPositioning = (chromosomeLength: number) => {
		const select = chromosomeLength - this._pids.length;
		return select > 0 ? map((p) => -p - 2, range(1, select)) : [];
	};

	private getAssignees = (remainders: number[], positioning: number[]) => {
		return pipe(concat(positioning))(without(remainders, this._pids));
	};

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

	private getTherapistPatientSubsetPermutations(
		chromosomes: Chromosome[],
		permutations: Permutation[]
	) {
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

	private getPermutations(assignees: number[], group: number) {
		const permutations: Permutation[] = [];
		const slots = filter((s: Slot) => s.group === group, this._slots);

		for (const slot of slots) {
			for (const therapist of this._therapists) {
				for (const pid of assignees) {
					if (
						this.isTherapistAvailable(therapist, slot.id) &&
						this.isPatientAvailable(pid, slot.id, therapist)
					) {
						permutations.push({
							group: group,
							slot: slot.id,
							therapist: therapist.id,
							patient: pid
						});
					}
				}
			}
		}

		return permutations;
	}

	private isTherapistAvailable = (therapist: Therapist, slot: number) => {
		return any((a: Availability) => a.slot === slot && a.available, therapist.availabilities);
	};

	private isPatientAvailable = (pid: number, slot: number, therapist: Therapist) => {
		if (pid === -1) return false;
		if (pid < -1) return true;

		const available = pipe(
			find(
				(p: Patient) =>
					p.id === pid && none((e: number) => e === pid, defaultTo([], therapist.excluded))
			),
			(p: Patient | undefined) =>
				isNil(p)
					? false
					: any((a: Availability) => a.slot === slot && a.available, p.availabilities)
		)(this._patients);

		return available;
	};

	private modifyPermutations = (permutations: Permutation[], permutation: Permutation) => {
		const invalidatedTherapists = filter(
			(p: Permutation) => p.therapist === permutation.therapist && p.slot === permutation.slot,
			permutations
		);

		const invalidatedPatients = filter((p: Permutation) => p.patient === permutation.patient)(
			permutations
		);

		const invalidatedSlotPositioning =
			permutation.patient < -2
				? filter((p: Permutation) => p.slot === permutation.slot && p.patient < -2)(permutations)
				: [];

		const invalidatedTherapistPositioning =
			permutation.patient < -2
				? filter(
						(p: Permutation) => p.therapist === permutation.therapist && p.patient < -2,
						permutations
				  )
				: [];

		return pipe(
			without(invalidatedTherapists),
			without(invalidatedPatients),
			without(invalidatedSlotPositioning),
			without(invalidatedTherapistPositioning)
		)(permutations);
	};
}
