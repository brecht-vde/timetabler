import {
	descend,
	either,
	groupBy,
	isEmpty,
	isNil,
	isNotNil,
	map,
	pipe,
	prepend,
	sortWith,
	values
} from 'ramda';
import type { Patient, Slot, Therapist } from '../domain/types';
import type { Chromosome, Gene } from './types';
import {
	getUnassignedGenes,
	getUnavailableGenes,
	sortGenesBySlotThenByTherapist
} from './queries/genes';
import { getGroupIds } from './queries/groups';
import { countAvailableSlotsByGroup } from './queries/therapists';
import {
	findPatientName,
	getPatientIds,
	getPendingPatientIds,
	getPositioningPatientIds,
	getUnassignedPatientIds
} from './queries/patients';
import {
	getAllPermutations,
	getPermutationsByDedicatedPatient,
	getPermutationsByTherapist,
	getRandomPermutation,
	getSubsetPermutations
} from './queries/permutations';
import { calculateFitness } from './fitness';
import { findSlotName } from './queries/slots';

export class Algorithm {
	private readonly _slots: Slot[];
	private readonly _therapists: Therapist[];
	private readonly _patients: Patient[];
	private readonly _patientIds: number[];

	constructor(slots: Slot[], therapists: Therapist[], patients: Patient[]) {
		if (either(isNil, isEmpty)(slots)) throw new Error("slots can't be null or empty.");
		if (either(isNil, isEmpty)(therapists)) throw new Error("therapists can't be null or empty.");
		if (either(isNil, isEmpty)(patients)) throw new Error("patients can't be null or empty.");

		this._slots = slots;
		this._therapists = therapists;
		this._patients = patients;
		this._patientIds = getPatientIds(this._patients);
	}

	public execute = (iterations: number) => {
		const chromosomes: [number, Chromosome][] = [];

		for (let index = 0; index < iterations; index++) {
			const chromosome = this.buildChromosome();
			const fitness = calculateFitness(chromosome);
			chromosomes.push([fitness, chromosome]);
		}

		const fittest = sortWith([descend((c: [number, Chromosome]) => c[0])], chromosomes);
		return fittest[0][1];
	};

	public toTable = (chromosome: Chromosome) => {
		const table: string[][] = [];

		const therapistNames = map((t: Therapist) => t.label, this._therapists);
		const headers = ['', ...therapistNames];
		table.push(headers);

		const grid = pipe(
			groupBy((g: Gene) => g.slot.toString()),
			values,
			map((gs: Gene[] | undefined) =>
				isNotNil(gs)
					? prepend(
							findSlotName(this._slots, gs[0].slot),
							map((g: Gene) => findPatientName(this._patients, g.patient), gs)
					  )
					: []
			)
		)(chromosome.genes);
		table.push(...grid);

		return table;
	};

	private buildChromosome = () => {
		let genes: Gene[] = [];
		const unassignedPatientIds: number[] = [];

		this.buildAssignedGenes(genes, unassignedPatientIds);

		this.buildUnavailableGenes(genes);

		this.buildUnassignedGenes(genes);

		genes = sortGenesBySlotThenByTherapist(genes);

		const chromosome: Chromosome = {
			genes: genes,
			unassigned: unassignedPatientIds
		};

		return chromosome;
	};

	private buildUnavailableGenes = (genes: Gene[]) => {
		const unavailable = getUnavailableGenes(this._therapists);
		genes.push(...unavailable);
	};

	private buildUnassignedGenes = (genes: Gene[]) => {
		const unassigned = getUnassignedGenes(genes, this._slots, this._therapists);
		genes.push(...unassigned);
	};

	private buildAssignedGenes = (genes: Gene[], unassignedPatientIds: number[]) => {
		const groups = getGroupIds(this._slots);

		for (const group of groups) {
			const availableSlotsCount = countAvailableSlotsByGroup(this._therapists, this._slots, group);
			const updatedUnassignedPatientIds = getUnassignedPatientIds(
				this._patientIds,
				unassignedPatientIds,
				availableSlotsCount
			);
			unassignedPatientIds.push(...updatedUnassignedPatientIds);

			const positioningIds = getPositioningPatientIds(this._patientIds, availableSlotsCount);
			const pendingIds = getPendingPatientIds(
				this._patientIds,
				unassignedPatientIds,
				positioningIds
			);

			let permutations = getAllPermutations(
				genes,
				pendingIds,
				group,
				this._slots,
				this._therapists,
				this._patients
			);

			for (let index = 0; index < availableSlotsCount; index++) {
				for (const therapist of this._therapists) {
					if (permutations.length === 0) continue;

					const subset = getPermutationsByTherapist(therapist, permutations);

					if (subset.length === 0) continue;

					const dedicated = getPermutationsByDedicatedPatient(therapist, subset);

					const selected = getRandomPermutation(subset, dedicated);

					const gene: Gene = {
						patient: selected.patient,
						slot: selected.slot,
						therapist: selected.therapist
					};

					genes.push(gene);

					permutations = getSubsetPermutations(permutations, selected);
				}
			}
		}
	};
}