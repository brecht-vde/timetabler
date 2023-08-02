import type { Patient, Slot, Therapist } from '$lib/logic/domain/types';
import { any, either, filter, forEach, isEmpty, isNil } from 'ramda';
import type { Permutation } from '../types';
import {
	IsPatientAssignedForGroup,
	IsPositioningAssignedForSlot,
	IsSessionAssignedForTherapist,
	IsSlotAssigned,
	isAvailable,
	isDedicatedAssigned,
	isPatient,
	sortBySlotThenByTherapist
} from './utilities';

const selectPermutations = (
	groups: number[],
	slots: Slot[],
	therapists: Therapist[],
	permutations: Permutation[]
) => {
	const combined: Permutation[] = [];

	const selection = selectPatientPermutations(groups, slots, therapists, permutations);
	combined.push(...selection);

	const remaining = fillPermutations(slots, therapists, selection);
	combined.push(...remaining);

	const sorted = sortBySlotThenByTherapist(combined);

	return sorted;
};

const selectPatientPermutations = (
	groups: number[],
	slots: Slot[],
	therapists: Therapist[],
	permutations: Permutation[]
) => {
	const selection: Permutation[] = [];

	forEach((g: number) => {
		const slotsCount = filter((s: Slot) => s.group === g, slots).length;

		for (let index = 0; index < slotsCount; index++) {
			forEach((t: Therapist) => {
				const selected = findPermutation(g, t, permutations, selection);
				if (selected) selection.push(selected);
			}, therapists);
		}
	}, groups);

	return selection;
};

const findPermutation = (
	group: number,
	therapist: Therapist,
	permutations: Permutation[],
	selection: Permutation[]
) => {
	let found: Permutation | null = null;

	found = findDedicated(group, therapist, permutations, selection);

	if (found) return found;

	found = findAny(group, therapist, permutations, selection);

	return found;
};

const findDedicated = (
	group: number,
	therapist: Therapist,
	permutations: Permutation[],
	selection: Permutation[]
) => {
	if (!therapist.dedicated) return null;

	const filtered = filter(
		(p: Permutation) =>
			!isDedicatedAssigned(selection, therapist) &&
			p.group === group &&
			p.therapist.id === therapist.id &&
			isPatient(p.session) &&
			(p.session as Patient).id === therapist.dedicated,
		permutations
	);

	const found = findRandom(filtered);
	return found;
};

const findAny = (
	group: number,
	therapist: Therapist,
	permutations: Permutation[],
	selection: Permutation[]
) => {
	const filtered = filter(
		(p: Permutation) =>
			p.group === group &&
			p.therapist === therapist &&
			!IsPatientAssignedForGroup(selection, p.session, group) &&
			!IsSessionAssignedForTherapist(selection, p.session, therapist) &&
			!IsSlotAssigned(selection, therapist, p.slot) &&
			!IsPositioningAssignedForSlot(selection, p.session, p.slot),
		permutations
	);

	const found = findRandom(filtered);
	return found;
};

const findRandom = (permutations: Permutation[]) =>
	either(isNil, isEmpty)(permutations)
		? null
		: permutations[Math.floor(Math.random() * permutations.length)];

const fillPermutations = (slots: Slot[], therapists: Therapist[], selection: Permutation[]) => {
	const filled: Permutation[] = [];
	const workset: Permutation[] = [];
	workset.push(...selection);

	forEach(
		(s: Slot) =>
			forEach((t: Therapist) => {
				const unavailable = fillUnavailablePermutation(s, t);

				if (unavailable) {
					workset.push(unavailable);
					filled.push(unavailable);
				}

				const open = fillOpenPermutation(s, t, workset);

				if (open) {
					workset.push(open);
					filled.push(open);
				}
			}, therapists),
		slots
	);

	return filled;
};

const fillUnavailablePermutation = (slot: Slot, therapist: Therapist): Permutation | null =>
	isAvailable(slot, therapist.availabilities)
		? null
		: {
				group: slot.group,
				slot: slot,
				therapist: therapist,
				session: 'U'
		  };

const fillOpenPermutation = (
	slot: Slot,
	therapist: Therapist,
	selection: Permutation[]
): Permutation | null =>
	any((p: Permutation) => p.slot === slot && p.therapist === therapist, selection)
		? null
		: {
				group: slot.group,
				slot: slot,
				therapist: therapist,
				session: 'O'
		  };

export default selectPermutations;
