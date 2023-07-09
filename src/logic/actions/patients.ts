import { get } from 'svelte/store';
import { patients } from '../../stores/patients-store';
import { findIndex, where, equals } from 'ramda';
import type { Availability, Patient } from '../types';

const GetId: () => number = () => {
	const index = get(patients).length + 1;
	return index;
};

const GetPatientIndex = (patients: Patient[], id: number) => {
	const index = findIndex(
		where({
			id: equals(id)
		}),
		patients
	);

	return index;
};

const GetAvailabilityIndex = (availabiltities: Availability[], day: number, slot: number) => {
	const index = findIndex(
		where({
			day: equals(day),
			slot: equals(slot)
		}),
		availabiltities
	);

	return index;
};

export const Create = (name?: string) => {
	const id = GetId();

	const patient = {
		id: id,
		label: name ?? `Patient ${id}`,
		availabilities: [
			{ day: 1, slot: 1, available: true },
			{ day: 1, slot: 2, available: true },
			{ day: 1, slot: 3, available: true },
			{ day: 1, slot: 4, available: true },
			{ day: 1, slot: 5, available: true },
			{ day: 1, slot: 6, available: true },
			{ day: 2, slot: 1, available: true },
			{ day: 2, slot: 2, available: true },
			{ day: 2, slot: 3, available: true },
			{ day: 2, slot: 4, available: true },
			{ day: 2, slot: 5, available: true },
			{ day: 2, slot: 6, available: true },
			{ day: 3, slot: 1, available: true },
			{ day: 3, slot: 2, available: true },
			{ day: 3, slot: 3, available: true },
			{ day: 3, slot: 4, available: true },
			{ day: 3, slot: 5, available: true },
			{ day: 3, slot: 6, available: true },
			{ day: 4, slot: 1, available: true },
			{ day: 4, slot: 2, available: true },
			{ day: 4, slot: 3, available: true },
			{ day: 4, slot: 4, available: true },
			{ day: 4, slot: 5, available: true },
			{ day: 4, slot: 6, available: true },
			{ day: 5, slot: 1, available: true },
			{ day: 5, slot: 2, available: true },
			{ day: 5, slot: 3, available: true },
			{ day: 5, slot: 4, available: true },
			{ day: 5, slot: 5, available: true },
			{ day: 5, slot: 6, available: true }
		]
	};

	patients.update((pa) => {
		return [...pa, patient];
	});
};

export const UpdateAvailability = (
	patientId: number,
	dayId: number,
	slotId: number,
	value: boolean
) => {
	const patientsArray = get(patients);
	const pix = GetPatientIndex(patientsArray, patientId);

	if (pix < 0) return;

	const availabilitiesArray = patientsArray[pix].availabilities;
	const aix = GetAvailabilityIndex(availabilitiesArray, dayId, slotId);

	if (aix < 0) return;

	patients.update((pa) => {
		pa[pix].availabilities[aix].available = value;
		return pa;
	});
};
