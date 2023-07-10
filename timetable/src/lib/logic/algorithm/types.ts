export interface Genome {
	unassigned: number[];
	individual: Chromosome;
}

export interface Chromosome {
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
