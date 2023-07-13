import type { Patient } from '$lib/logic/domain/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

const patientsStore: Writable<Patient[]> = localStorageStore('patientsStore', []);
