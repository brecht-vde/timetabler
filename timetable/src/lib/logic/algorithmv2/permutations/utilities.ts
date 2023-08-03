import {
	any,
	ascend,
	count,
	defaultTo,
	either,
	filter,
	isEmpty,
	isNil,
	map,
	sortWith,
	uniq
} from 'ramda';
import type { Availability, Day, Patient, Slot, Therapist } from '../../domain/types';
import type { Permutation } from '../types';

export const isAvailable = (day: Day, slot: Slot, availabilities: Availability[]) =>
	any((a: Availability) => a.day === day.id && a.slot === slot.id && a.available, availabilities);

export const isExcluded = (therapist: Therapist, patient: Patient) =>
	any((e: number) => e === patient.id, defaultTo([], therapist.excluded));

export const isPatient = (session: Patient | string) => typeof session !== 'string';

export const isDedicatedAssigned = (permutations: Permutation[], therapist: Therapist) =>
	any(
		(s: Permutation) =>
			s.therapist.id === therapist.id &&
			isPatient(s.session) &&
			(s.session as Patient).id === therapist.dedicated,
		permutations
	);

export const IsPatientAssignedForGroup = (
	permutations: Permutation[],
	session: Patient | string,
	group: number
) =>
	isPatient(session)
		? any((s: Permutation) => s.session === session && s.slot.group === group, permutations)
		: false;

export const IsSessionAssignedForTherapist = (
	permutations: Permutation[],
	session: Patient | string,
	therapist: Therapist
) => any((s: Permutation) => s.session === session && s.therapist === therapist, permutations);

export const IsPositioningAssignedForSlot = (
	permutations: Permutation[],
	session: Patient | string,
	slot: Slot
) =>
	isPatient(session)
		? false
		: any((s: Permutation) => s.session === session && s.slot === slot, permutations);

export const IsSlotAssigned = (permutations: Permutation[], therapist: Therapist, slot: Slot) =>
	any((s: Permutation) => s.therapist.id === therapist.id && s.slot.id === slot.id, permutations);

export const selectRandom = (permutations: Permutation[]) =>
	either(isNil, isEmpty)(permutations)
		? null
		: permutations[Math.floor(Math.random() * permutations.length)];

export const getGroups = (slots: Slot[]) => {
	return uniq(map((s: Slot) => s.group, slots));
};

export const sortBySlotThenByTherapist = (permutations: Permutation[]) =>
	sortWith(
		[ascend((p: Permutation) => p.slot.id), ascend((p: Permutation) => p.therapist.id)],
		permutations
	);

export const getPatientsByOccurences = (
	patients: Patient[],
	permutations: Permutation[],
	occurences: number
) =>
	filter(
		(p: Patient) => count((pe: Permutation) => pe.session === p, permutations) === occurences,
		patients
	);
