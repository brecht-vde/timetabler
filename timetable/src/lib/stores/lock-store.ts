import { localStorageStore } from '@skeletonlabs/skeleton';
import { filter } from 'ramda';
import type { Writable } from 'svelte/store';

const lockStore: Writable<number[]> = localStorageStore('lockStore', []);

const addLock = (id: number) => {
	lockStore.update((current) => [...current, id]);
};

const removeLock = (id: number) => {
	lockStore.update((current) => filter((cid: number) => cid !== id, current));
};

export { lockStore, addLock, removeLock };
