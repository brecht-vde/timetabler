import type { Therapist } from '$lib/logic/domain/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

const therapistsStore: Writable<Therapist[]> = localStorageStore('therapistsStore', []);
