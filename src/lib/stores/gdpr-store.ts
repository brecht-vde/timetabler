import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';

const gpdrStore: Writable<boolean> = localStorageStore('gpdrStore', false);

const consented = () => get(gpdrStore);

const dissent = () => {
	gpdrStore.update((current) => false);
};

const consent = () => {
	gpdrStore.update((current) => true);
};

export { consented, consent, dissent };
