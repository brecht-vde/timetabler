import { get } from 'svelte/store';
import { therapists } from '../../stores/therapists-store';
import type { Therapist } from '../types';

const GetId: () => number = () => {
	const index = get(therapists).length + 1;
	return index;
};

export const Create = (name?: string) => {
	const id = GetId();

	const therapist: Therapist = {
		id: id,
		label: name ?? `Therapist ${id}`,
		availabilities: [
			{ day: 1, slot: 1, available: true },
			{ day: 1, slot: 2, available: true },
			{ day: 1, slot: 3, available: true },
			{ day: 1, slot: 4, available: true },
			{ day: 1, slot: 5, available: true },
			{ day: 1, slot: 6, available: true },
			{ day: 2, slot: 1, available: true },
			{ day: 2, slot: 2, available: true },
			{ day: 2, slot: 3, available: true },
			{ day: 2, slot: 4, available: true },
			{ day: 2, slot: 5, available: true },
			{ day: 2, slot: 6, available: true },
			{ day: 3, slot: 1, available: true },
			{ day: 3, slot: 2, available: true },
			{ day: 3, slot: 3, available: true },
			{ day: 3, slot: 4, available: true },
			{ day: 3, slot: 5, available: true },
			{ day: 3, slot: 6, available: true },
			{ day: 4, slot: 1, available: true },
			{ day: 4, slot: 2, available: true },
			{ day: 4, slot: 3, available: true },
			{ day: 4, slot: 4, available: true },
			{ day: 4, slot: 5, available: true },
			{ day: 4, slot: 6, available: true },
			{ day: 5, slot: 1, available: true },
			{ day: 5, slot: 2, available: true },
			{ day: 5, slot: 3, available: true },
			{ day: 5, slot: 4, available: true },
			{ day: 5, slot: 5, available: true },
			{ day: 5, slot: 6, available: true }
		]
	};

	therapists.update((ta) => {
		return [...ta, therapist];
	});
};
