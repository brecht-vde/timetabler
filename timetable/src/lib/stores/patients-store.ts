import type { Availability, Patient } from '$lib/logic/domain/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { map } from 'ramda';
import type { Writable } from 'svelte/store';

const patientsStore: Writable<{ [id: string]: Patient }> = localStorageStore('patientsStore', {});

const createPatient = (patient: Patient) => {
	patientsStore.update((current) => ({
		...current,
		[patient.id]: patient
	}));
};

const updatePatient = (id: string, updates: Partial<Patient>) => {
	patientsStore.update((current) => ({
		...current,
		[id]: { ...current?.[id], ...updates }
	}));
};

const deletePatient = (id: string) => {
	patientsStore.update((current) => {
		const { [id]: _, ...remainingPatients } = current;
		return remainingPatients;
	});
};

const updateAvailability = (id: string, update: Availability) => {
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
