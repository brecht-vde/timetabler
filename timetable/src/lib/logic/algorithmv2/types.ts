import type { Patient, Slot, Therapist } from '../domain/types';

export interface Permutation {
	group: number;
	slot: Slot;
	therapist: Therapist;
	session: Patient | string;
}

export interface Solution {
	permutations: Permutation[];
	unassigned: Patient[];
	insufficient: Patient[];
	fitness: number;
}