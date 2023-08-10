import { descend, isNotNil, sortWith } from 'ramda';
import type { Day, Patient, Slot, Therapist } from '../domain/types';
import { getGroups, getPatientsByOccurences } from './permutations/utilities';
import type { Permutation, Planning } from './types';
import initializePermutations from './permutations/initialization';
import selectPermutations from './permutations/selection';
import calculateFitness from './permutations/fitness';
import mapToPlanning from './permutations/mapping';

export class Algorithm {
	private readonly _days: Day[];
	private readonly _slots: Slot[];
	private readonly _therapists: Therapist[];
	private readonly _patients: Patient[];
	private readonly _groups: number[];
	private readonly _permutations: Permutation[];

	constructor(days: Day[], slots: Slot[], therapists: Therapist[], patients: Patient[]) {
		this._days = days;
		this._slots = slots;
		this._therapists = sortWith([descend((t: Therapist) => isNotNil(t.dedicated))], therapists);
		this._patients = patients;
		this._groups = getGroups(this._slots);
		this._permutations = initializePermutations(
			this._days,
			this._slots,
			this._therapists,
			this._patients
		);
	}

	public execute(day: Day, iterations: number) {
		const plannings: Planning[] = [];

		for (let index = 0; index < iterations; index++) {
			const planning = this.generatePlanning(day);
			plannings.push(planning);
		}

		const fittest = sortWith([descend((s: Planning) => s.fitness)], plannings);

		if (day.label ==='W') {
			console.log(JSON.stringify(fittest));
		}

		return fittest[0];
	}

	private generatePlanning(day: Day) {
		const permutations = selectPermutations(
			day,
			this._groups,
			this._slots,
			this._therapists,
			this._permutations
		);

		const unassigned = getPatientsByOccurences(this._patients, permutations, 0);

		const insufficient = getPatientsByOccurences(this._patients, permutations, 1);

		const fitness = calculateFitness(unassigned, insufficient, permutations);

		const planning = mapToPlanning(day, fitness, permutations, insufficient, unassigned);

		return planning;
	}
}
