export interface Chromosome {
	unassigned: number[];
	genes: Gene[];
}

export interface Gene {
	slot: number;
	therapist: number;
	patient: number;
}

export interface Permutation {
	group: number;
	slot: number;
	therapist: number;
	patient: number;
}

export interface Combination {
	therapist: number;
	patient: number;
}
