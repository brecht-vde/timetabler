import {
	count,
	descend,
	forEach,
	groupBy,
	isNil,
	isNotNil,
	map,
	pipe,
	sortBy,
	sortWith,
	values
} from 'ramda';
import type { Patient, Slot, Therapist } from '../domain/types';
import { getGroups, getPatientsWithLessOccurencesThan } from './utilities';
import { PermutationHandler } from './permutation-handler';
import type { Permutation, Solution } from './types';

export class Algorithm {
	private readonly _slots: Slot[];
	private readonly _therapists: Therapist[];
	private readonly _patients: Patient[];
	private readonly _groups: number[];
	private readonly _permutationHandler: PermutationHandler;

	constructor(slots: Slot[], therapists: Therapist[], patients: Patient[]) {
		this._slots = slots;
		this._therapists = sortWith([descend((t: Therapist) => isNotNil(t.dedicated))], therapists);
		this._patients = patients;
		this._groups = getGroups(this._slots);
		this._permutationHandler = new PermutationHandler(
			this._slots,
			this._therapists,
			this._patients,
			this._groups
		);
	}

	public execute(iterations: number) {
		const solutions: Solution[] = [];

		for (let index = 0; index < iterations; index++) {
			const solution = this.execute_internal();
			console.log(solution.fitness);
			solutions.push(solution);
		}

		const fittest = sortWith([descend((s: Solution) => s.fitness)], solutions);

		console.log(fittest[0].fitness);
		return fittest[0];
	}

	private execute_internal() {
		// handle permutations
		const permutations = this._permutationHandler.handle();

		// part of fitness/solution?
		// check for unassigned patients
		const unassigned = getPatientsWithLessOccurencesThan(this._patients, permutations, 1);

		// check for insufficiently assigned patients
		const insufficient = getPatientsWithLessOccurencesThan(this._patients, permutations, 2);

		// handle fitness
		const solution = this.fitness(permutations, unassigned, insufficient);

		return solution;
	}

	private fitness(permutations: Permutation[], unassigned: Patient[], insufficient: Patient[]) {
		let fitness = 0.0;

		// reduce if any unassigned
		fitness -= Math.pow(unassigned.length, 2);

		// reduce if any insufficient
		fitness -= Math.pow(insufficient.length, 2);

		// time slot has a lot of Open slots.
		const perSlot = pipe(
			groupBy((p: Permutation) => p.slot.id.toString()),
			values,
			map((p: Permutation[] | undefined) => (isNil(p) ? [] : p))
		)(permutations);

		forEach((ps: Permutation[]) => {
			const open = count((p: Permutation) => p.session === 'O', ps);
			fitness -= Math.pow(open, 2);
		}, perSlot);

		// therapist has a lot of unassigned slots.
		const perTherapist = pipe(
			groupBy((p: Permutation) => p.therapist.id.toString()),
			values,
			map((p: Permutation[] | undefined) => (isNil(p) ? [] : p))
		)(permutations);

		forEach((ps: Permutation[]) => {
			const open = count((p: Permutation) => p.session === 'O', ps);
			const positioning = count((p: Permutation) => p.session === 'P', ps);

			fitness -= Math.pow(open + positioning, 2);
		}, perTherapist);

		// return the solution with score
		const solution: Solution = {
			permutations: permutations,
			insufficient: insufficient,
			unassigned: unassigned,
			fitness: fitness
		};

		return solution;
	}
}
