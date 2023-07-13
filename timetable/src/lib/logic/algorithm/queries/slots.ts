import type { Slot } from '$lib/logic/domain/types';
import { filter, find, isNotNil } from 'ramda';

export const getSlotsByGroup = (slots: Slot[], group: number) => {
	return filter((s: Slot) => s.group === group, slots);
};

export const findSlotName = (slots: Slot[], id: number) => {
	const slot = find((s: Slot) => s.id === id, slots);
	return isNotNil(slot) ? slot.label : 'invalid';
};
