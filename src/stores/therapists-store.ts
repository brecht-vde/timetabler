import { writable, type Writable } from 'svelte/store';
import type { Therapist } from '../logic/types';

export const therapists: Writable<Therapist[]> = writable([]);
