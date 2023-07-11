import type { Availability, Patient, Therapist } from '$lib/logic/domain/types';
import {
	any,
	concat,
	defaultTo,
	find,
	isNil,
	map,
	none,
	pipe,
	range,
	sort,
	take,
	without
} from 'ramda';

export const getPatientIds = (patients: Patient[]) => {
	return map((p: Patient) => p.id, patients);
};

export const getUnassignedPatientIds = (
	patientids: number[],
	alreadyUnassigned: number[],
	availableSlotsCount: number
) => {
	const select = patientids.length - availableSlotsCount;

	const unassigned = (
		select > 0
			? pipe(
					sort(() => Math.random() - 0.5),
					take(select)
			  )(without(alreadyUnassigned, patientids))
			: []
	) as number[];

	return unassigned;
};

export const getPositioningPatientIds = (patientIds: number[], availableSlotsCount: number) => {
	const select = availableSlotsCount - patientIds.length + 1;
	return select > 0 ? map((p) => -p - 2, range(1, select)) : [];
};

export const getPendingPatientIds = (
	patientIds: number[],
	unassignedIds: number[],
	positioningIds: number[]
) => {
	return pipe(concat(positioningIds))(without(unassignedIds, patientIds));
};

export const isPatientAvailable = (
	patientId: number,
	slot: number,
	therapist: Therapist,
	patients: Patient[]
) => {
	if (patientId === -1) return false;
	if (patientId < -1) return true;

	const available = pipe(
		find(
			(p: Patient) =>
				p.id === patientId &&
				none((e: number) => e === patientId, defaultTo([], therapist.excluded))
		),
		(p: Patient | undefined) =>
			isNil(p) ? false : any((a: Availability) => a.slot === slot && a.available, p.availabilities)
	)(patients);

	return available;
};
