import type { Patient, Slot, Therapist } from '$lib/logic/domain/types';
import { forEach } from 'ramda';
import type { Permutation } from '../types';
import { isAvailable, isExcluded } from './utilities';

const initializePermutations = (slots: Slot[], therapists: Therapist[], patients: Patient[]) => {
	const permutations: Permutation[] = [];

	forEach(
		(s: Slot) =>
			forEach((t: Therapist) => {
				const patientPermutations = initializePatientPermutations(s, t, patients);
				const positioningPermutations = initializePositioningPermutations(s, t);
				permutations.push(...patientPermutations);
				permutations.push(...positioningPermutations);
			}, therapists),
		slots
	);

	return permutations;
};

const initializePatientPermutations = (slot: Slot, therapist: Therapist, patients: Patient[]) => {
	const permutations: Permutation[] = [];

	forEach((p: Patient) => {
		if (
			isAvailable(slot, therapist.availabilities) &&
			isAvailable(slot, p.availabilities) &&
			!isExcluded(therapist, p)
		) {
			permutations.push({
				group: slot.group,
				slot: slot,
				therapist: therapist,
				session: p
			});
		}
	}, patients);

	return permutations;
};

const initializePositioningPermutations = (slot: Slot, therapist: Therapist) => {
	const permutations: Permutation[] = [];

	if (isAvailable(slot, therapist.availabilities)) {
		permutations.push({
			group: slot.group,
			slot: slot,
			therapist: therapist,
			session: 'P'
		});
	}

	return permutations;
};

export default initializePermutations;
