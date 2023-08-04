import type { Patient } from '$lib/logic/domain/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

const patientsStore: Writable<{ [id: number]: Patient }> = localStorageStore('patientsStore', {});

const createPatient = (patient: Patient) => {
	patientsStore.update((current) => ({
		...current,
		[patient.id]: patient
	}));
};

const updatePatient = (id: number, updates: Partial<Patient>) => {
	patientsStore.update((current) => ({
		...current,
		[id]: { ...current?.[id], ...updates }
	}));
};

const deletePatient = (id: number) => {
	patientsStore.update((current) => {
		const { [id]: _, ...remainingPatients } = current;
		return remainingPatients;
	});
};

export { patientsStore, createPatient, updatePatient, deletePatient };
