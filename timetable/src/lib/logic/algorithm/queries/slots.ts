import type { Slot } from '$lib/logic/domain/types';
import { filter } from 'ramda';

export const getSlotsByGroup = (slots: Slot[], group: number) => {
	return filter((s: Slot) => s.group === group, slots);
};
