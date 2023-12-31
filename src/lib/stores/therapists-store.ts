import type { Availability, Therapist } from '$lib/logic/domain/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { map } from 'ramda';
import type { Writable } from 'svelte/store';
import { consented } from './gdpr-store';

const therapistsStore: Writable<{ [id: string]: Therapist }> = localStorageStore(
	'therapistsStore',
	{}
);

const createTherapist = (patient: Therapist) => {
	if (!consented()) return;

	therapistsStore.update((current) => ({
		...current,
		[patient.id]: patient
	}));
};

const updateTherapist = (id: string, updates: Partial<Therapist>) => {
	if (!consented()) return;

	therapistsStore.update((current) => ({
		...current,
		[id]: { ...current?.[id], ...updates }
	}));
};

const deleteTherapist = (id: string) => {
	if (!consented()) return;

	therapistsStore.update((current) => {
		const { [id]: _, ...remainingTherapists } = current;
		return remainingTherapists;
	});
};

const updateAvailability = (id: string, update: Availability) => {
	if (!consented()) return;

	therapistsStore.update((current) => ({
		...current,
		[id]: {
			...current[id],
			availabilities: map(
				(a: Availability) =>
					a.day === update.day && a.slot === update.slot
						? { ...a, available: update.available }
						: a,
				current[id].availabilities
			)
		}
	}));
};

export { therapistsStore, createTherapist, updateTherapist, deleteTherapist, updateAvailability };
