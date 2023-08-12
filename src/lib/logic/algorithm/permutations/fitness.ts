import type { Patient } from '$lib/logic/domain/types';
import { count, forEach, groupBy, isNil, map, pipe, values } from 'ramda';
import type { Permutation } from '../types';

const calculateFitness = (
	unassigned: Patient[],
	insufficient: Patient[],
	permutations: Permutation[]
) => {
	let fitness = 0.0;

	fitness -= scoreUnassignedPatients(unassigned);
	fitness -= scoreInsufficientPatients(insufficient);
	fitness -= scoreOpenPerSlot(permutations);
	fitness -= scoreOpenPerTherapist(permutations);

	return fitness;
};

const scoreUnassignedPatients = (unassigned: Patient[]) => Math.pow(unassigned.length + 50, 2);

const scoreInsufficientPatients = (insufficient: Patient[]) =>
	Math.pow(insufficient.length + 25, 2);

const scoreOpenPerSlot = (permutations: Permutation[]) => {
	const perSlot = pipe(
		groupBy((p: Permutation) => p.slot.id.toString()),
		values,
		map((p: Permutation[] | undefined) => (isNil(p) ? [] : p))
	)(permutations);

	let score = 0.0;

	forEach((ps: Permutation[]) => {
		const open = count((p: Permutation) => p.session === 'O', ps);
		score += Math.pow(open, 2);
	}, perSlot);

	return score;
};

const scoreOpenPerTherapist = (permutations: Permutation[]) => {
	const perTherapist = pipe(
		groupBy((p: Permutation) => p.therapist.id.toString()),
		values,
		map((p: Permutation[] | undefined) => (isNil(p) ? [] : p))
	)(permutations);

	let score = 0.0;

	forEach((ps: Permutation[]) => {
		const open = count((p: Permutation) => p.session === 'O', ps);
		const positioning = count((p: Permutation) => p.session === 'P', ps);

		score += Math.pow(open + positioning, 2);
	}, perTherapist);

	return score;
};

export default calculateFitness;
