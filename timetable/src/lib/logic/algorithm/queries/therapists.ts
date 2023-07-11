import type { Availability, Slot, Therapist } from '$lib/logic/domain/types';
import { chain, filter, pipe, length, sortBy, isNotNil, any } from 'ramda';
import { getGroupBySlot } from './groups';

export const countAvailableSlotsByGroup = (
	therapists: Therapist[],
	slots: Slot[],
	group: number
) => {
	return pipe(
		chain((t: Therapist) => t.availabilities),
		filter((a: Availability) => a.available && getGroupBySlot(slots, a.slot) === group),
		length
	)(therapists);
};

export const sortTherapistsByDedication = (therapists: Therapist[]) => {
	return sortBy((t: Therapist) => isNotNil(t.dedicated) && t.dedicated > 0, therapists);
};

export const isTherapistAvailable = (therapist: Therapist, slot: number) => {
	return any((a: Availability) => a.slot === slot && a.available, therapist.availabilities);
};
