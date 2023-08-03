import type { Day, Patient, Slot, Therapist } from '../domain/types';

export interface Permutation {
	day: Day;
	group: number;
	slot: Slot;
	therapist: Therapist;
	session: Patient | string;
}

export interface Planning {
	day: string;
	data: Grid;
	unassigned: string[];
	insufficient: string[];
	fitness: number;
}

export interface Grid {
	columns: string[];
	rows: string[];
	cells: Cells;
}

export interface Cells {
	[row: string]: {
		[column: string]: string;
	};
}
