import { filter, isNotNil, map, none, pipe, without } from 'ramda';
import type { Combination, Gene, Permutation } from '../types';
import { getAlreadyAssignedTherapistPatientCombinations } from './combinations';
import type { Patient, Slot, Therapist } from '$lib/logic/domain/types';
import { getSlotsByGroup } from './slots';
import { isTherapistAvailable } from './therapists';
import { isPatientAvailable } from './patients';

export const getAllPermutations = (
	genes: Gene[],
	pendingIds: number[],
	group: number,
	slots: Slot[],
	therapists: Therapist[],
	patients: Patient[]
) => {
	let permutations = getPendingPermutations(pendingIds, group, slots, therapists, patients);
	permutations = getTherapistPatientSubsetPermutations(genes, permutations);
	permutations = getPositioningPermutations(genes, permutations);
	return permutations;
};

export const getPositioningPermutations = (genes: Gene[], permutations: Permutation[]) => {
	const positioning = pipe(
		filter((g: Gene) => g.patient < -2),
		map((g: Gene) => g.therapist)
	)(genes);

	const subset = filter(
		(p: Permutation) => none((tid: number) => p.therapist === tid, positioning),
		permutations
	);

	return subset;
};

export const getTherapistPatientSubsetPermutations = (
	genes: Gene[],
	permutations: Permutation[]
) => {
	const combinations = getAlreadyAssignedTherapistPatientCombinations(genes);

	const subset = filter(
		(p: Permutation) =>
			none(
				(c: Combination) => p.therapist === c.therapist && p.patient === c.patient,
				combinations
			),
		permutations
	);

	return subset;
};

export const getPendingPermutations = (
	assignees: number[],
	group: number,
	slots: Slot[],
	therapists: Therapist[],
	patients: Patient[]
) => {
	const permutations: Permutation[] = [];
	const subset = getSlotsByGroup(slots, group);

	for (const slot of subset) {
		for (const therapist of therapists) {
			for (const pid of assignees) {
				if (
					isTherapistAvailable(therapist, slot.id) &&
					isPatientAvailable(pid, slot.id, therapist, patients)
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
};

export const getSubsetPermutations = (permutations: Permutation[], permutation: Permutation) => {
	const assignedTherapistPermutations = getAssignedTherapistPermutations(permutations, permutation);
	const assignedPatientPermutations = getAssignedPatientPermutations(permutations, permutation);
	const assignedSlotPositioningPermutations = getAssignedSlotPositioningPermutations(
		permutations,
		permutation
	);
	const assignedTherapistPositioningPermutations = getAssignedTherapistPositioningPermutations(
		permutations,
		permutation
	);

	return pipe(
		without(assignedTherapistPermutations),
		without(assignedPatientPermutations),
		without(assignedSlotPositioningPermutations),
		without(assignedTherapistPositioningPermutations)
	)(permutations);
};

export const getAssignedTherapistPermutations = (
	permutations: Permutation[],
	permutation: Permutation
) => {
	return filter(
		(p: Permutation) => p.therapist === permutation.therapist && p.slot === permutation.slot,
		permutations
	);
};

export const getAssignedPatientPermutations = (
	permutations: Permutation[],
	permutation: Permutation
) => {
	return filter((p: Permutation) => p.patient === permutation.patient)(permutations);
};

export const getAssignedSlotPositioningPermutations = (
	permutations: Permutation[],
	permutation: Permutation
) => {
	return permutation.patient < -2
		? filter((p: Permutation) => p.slot === permutation.slot && p.patient < -2)(permutations)
		: [];
};

export const getAssignedTherapistPositioningPermutations = (
	permutations: Permutation[],
	permutation: Permutation
) => {
	return permutation.patient < -2
		? filter(
				(p: Permutation) => p.therapist === permutation.therapist && p.patient < -2,
				permutations
		  )
		: [];
};

export const getPermutationsByTherapist = (therapist: Therapist, permutations: Permutation[]) => {
	return filter((p: Permutation) => p.therapist === therapist.id, permutations);
};

export const getPermutationsByDedicatedPatient = (
	therapist: Therapist,
	permutations: Permutation[]
) => {
	return isNotNil(therapist?.dedicated)
		? filter((p: Permutation) => p.patient === therapist.dedicated, permutations)
		: [];
};

export const getRandomPermutation = (permutations: Permutation[], dedicated: Permutation[]) => {
	return dedicated.length > 0
		? dedicated[Math.floor(Math.random() * dedicated.length)]
		: permutations[Math.floor(Math.random() * permutations.length)];
};
