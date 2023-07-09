import { writable, type Writable } from 'svelte/store';
import type { Patient } from '../logic/types';

export const patients: Writable<Patient[]> = writable([]);

