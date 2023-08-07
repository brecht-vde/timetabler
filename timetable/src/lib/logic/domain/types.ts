import { v4 as uuidv4 } from 'uuid';

export interface Day {
	id: number;
	label: string;
}

export interface Slot {
	id: number;
	label: string;
	group: number;
}

export class Therapist {
	id: string;
	label: string;
	dedicated?: string[];
	excluded?: string[];
	availabilities: Availability[];

	private constructor(
		label: string,
		availabilitites: Availability[],
		dedicated?: string[],
		excluded?: string[]
	) {
		this.id = uuidv4();
		this.label = label;
		this.availabilities = availabilitites;
		this.dedicated = dedicated;
		this.excluded = excluded;
	}

	static createTherapist(
		label: string,
		availabilities: Availability[],
		dedicated?: string[],
		excluded?: string[]
	) {
		return new Therapist(label, availabilities, dedicated, excluded);
	}
}

export class Patient {
	id: string;
	label: string;
	availabilities: Availability[];

	private constructor(label: string, availabilities: Availability[]) {
		this.id = uuidv4();
		this.label = label;
		this.availabilities = availabilities;
	}

	static createPatient(label: string, availabilities: Availability[]) {
		return new Patient(label, availabilities);
	}
}

export interface Availability {
	slot: number;
	day: number;
	available: boolean;
}