import type { Slot } from '$lib/logic/domain/types';
import { find, map, uniq } from 'ramda';

export const getGroupIds = (slots: Slot[]) => {
	return uniq(map((s: Slot) => s.group, slots));
};

export const getGroupBySlot = (slots: Slot[], slot: number) => {
	return find((s: Slot) => s.id === slot, slots)?.group;
};
