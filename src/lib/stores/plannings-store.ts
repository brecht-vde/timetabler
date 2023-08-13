import { Plannings } from '$lib/data/data';
import type { Planning } from '$lib/logic/algorithm/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { findIndex, forEach } from 'ramda';
import type { Writable } from 'svelte/store';
import { consented } from './gdpr-store';

const planningsStore: Writable<Planning[]> = localStorageStore('planningsStore', Plannings);

const setPlannings = (plannings: Planning[]) => {
	if (!consented()) return;

	planningsStore.update((current) => {
		forEach((p: Planning) => {
			const index = findIndex((c: Planning) => c.id === p.id, current);
			if (index !== -1) {
				current[index] = p;
			}
		}, plannings);

		return current;
	});
};

const clearPlannings = () => {
	if (!consented()) return;

	planningsStore.update((current) => []);
};

export { planningsStore, setPlannings, clearPlannings };
