import { descend, isNotNil, sortWith } from 'ramda';
import type { Day, Patient, Slot, Therapist } from '../domain/types';
import { getGroups, getPatientsWithLessOccurencesThan } from './permutations/utilities';
import type { Permutation, Solution } from './types';
import initializePermutations from './permutations/initialization';
import selectPermutations from './permutations/selection';
import calculateFitness from './permutations/fitness';

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
		const solutions: Solution[] = [];

		for (let index = 0; index < iterations; index++) {
			const solution = this.generateSolution(day);
			solutions.push(solution);
		}

		const fittest = sortWith([descend((s: Solution) => s.fitness)], solutions);
		return fittest[0];
	}

	private generateSolution(day: Day) {
		const permutations = selectPermutations(
			day,
			this._groups,
			this._slots,
			this._therapists,
			this._permutations
		);

		const unassigned = getPatientsWithLessOccurencesThan(this._patients, permutations, 1);

		const insufficient = getPatientsWithLessOccurencesThan(this._patients, permutations, 2);

		const fitness = calculateFitness(unassigned, insufficient, permutations);

		const solution: Solution = {
			day: day,
			fitness: fitness,
			insufficient: insufficient,
			permutations: permutations,
			unassigned: unassigned
		};

		return solution;
	}
}
