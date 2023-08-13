import type { Availability, Patient } from '$lib/logic/domain/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { map } from 'ramda';
import type { Writable } from 'svelte/store';
import { consented } from './gdpr-store';

const patientsStore: Writable<{ [id: string]: Patient }> = localStorageStore('patientsStore', {});

const createPatient = (patient: Patient) => {
	if (!consented()) return;

	patientsStore.update((current) => ({
		...current,
		[patient.id]: patient
	}));
};

const updatePatient = (id: string, updates: Partial<Patient>) => {
	if (!consented()) return;

	patientsStore.update((current) => ({
		...current,
		[id]: { ...current?.[id], ...updates }
	}));
};

const deletePatient = (id: string) => {
	if (!consented()) return;

	patientsStore.update((current) => {
		const { [id]: _, ...remainingPatients } = current;
		return remainingPatients;
	});
};

const updateAvailability = (id: string, update: Availability) => {
	if (!consented()) return;

	patientsStore.update((current) => ({
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

export { patientsStore, createPatient, updatePatient, deletePatient, updateAvailability };
