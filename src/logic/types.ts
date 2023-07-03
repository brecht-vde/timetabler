export interface Day {
	id: number;
	label: string;
}

export interface Slot {
	id: number;
	label: string;
	group: number;
	day: number;
}

export interface Availability {
	slot: number;
	available: boolean;
}

export interface Therapist {
	id: number;
	label: string;
	dedicated?: number;
	excluded?: number[];
	availability: Availability[];
}

export interface Patient {
	id: number;
	label: string;
	availability: Availability[];
}
