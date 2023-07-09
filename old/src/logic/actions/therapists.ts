import { get } from 'svelte/store';
import { therapists } from '../../stores/therapists-store';
import type { Availability, Therapist } from '../types';
import { equals, findIndex, where } from 'ramda';

const GetId: () => number = () => {
	const index = get(therapists).length + 1;
	return index;
};

const GetTherapistIndex = (therapists: Therapist[], id: number) => {
	const index = findIndex(
		where({
			id: equals(id)
		}),
		therapists
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

	const therapist: Therapist = {
		id: id,
		label: name ?? `Therapist ${id}`,
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

	therapists.update((ta) => {
		return [...ta, therapist];
	});
};

export const UpdateAvailability = (
	patientId: number,
	dayId: number,
	slotId: number,
	value: boolean
) => {
	const patientsArray = get(therapists);
	const pix = GetTherapistIndex(patientsArray, patientId);

	if (pix < 0) return;

	const availabilitiesArray = patientsArray[pix].availabilities;
	const aix = GetAvailabilityIndex(availabilitiesArray, dayId, slotId);

	if (aix < 0) return;

	therapists.update((ta) => {
		ta[pix].availabilities[aix].available = value;
		return ta;
	});
};
