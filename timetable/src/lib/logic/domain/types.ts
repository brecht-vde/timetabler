export interface Day {
	id: number;
	label: string;
}

export interface Slot {
	id: number;
	label: string;
	group: number;
}

export interface Therapist {
	id: number;
	label: string;
	dedicated?: number;
	excluded?: number[];
	availabilities: Availability[];
}

export interface Patient {
	id: number;
	label: string;
	availabilities: Availability[];
}

export interface Availability {
	slot: number;
	day: number;
	available: boolean;
}