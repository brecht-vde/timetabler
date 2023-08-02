import type { Day, Patient, Slot, Therapist } from '../domain/types';

export interface Permutation {
	day: Day;
	group: number;
	slot: Slot;
	therapist: Therapist;
	session: Patient | string;
}

export interface Solution {
	day: Day;
	permutations: Permutation[];
	unassigned: Patient[];
	insufficient: Patient[];
	fitness: number;
}
