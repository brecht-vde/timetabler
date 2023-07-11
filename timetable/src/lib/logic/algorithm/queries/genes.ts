import { ascend, chain, none, sortWith } from 'ramda';
import type { Gene } from '../types';
import type { Availability, Slot, Therapist } from '$lib/logic/domain/types';

export const sortGenesBySlotThenByTherapist = (genes: Gene[]) => {
	return sortWith([ascend((g: Gene) => g.slot), ascend((g: Gene) => g.therapist)], genes);
};

export const getUnavailableGenes = (therapists: Therapist[]) => {
	return chain(
		(t: Therapist) =>
			chain(
				(a: Availability) => (!a.available ? [{ slot: a.slot, therapist: t.id, patient: -1 }] : []),
				t.availabilities
			),
		therapists
	);
};

export const getUnassignedGenes = (genes: Gene[], slots: Slot[], therapists: Therapist[]) => {
	const newGenes: Gene[] = [];

	for (const slot of slots) {
		for (const therapist of therapists) {
			if (none((g: Gene) => g.slot === slot.id && g.therapist === therapist.id, genes)) {
				newGenes.push({ slot: slot.id, therapist: therapist.id, patient: -2 });
			}
		}
	}

	return newGenes;
};
