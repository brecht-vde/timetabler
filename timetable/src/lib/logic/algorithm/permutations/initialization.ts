import type { Day, Patient, Slot, Therapist } from '$lib/logic/domain/types';
import { forEach } from 'ramda';
import type { Permutation } from '../types';
import { isAvailable, isExcluded } from './utilities';

const initializePermutations = (
	days: Day[],
	slots: Slot[],
	therapists: Therapist[],
	patients: Patient[]
) => {
	const permutations: Permutation[] = [];

	forEach(
		(d: Day) =>
			forEach(
				(s: Slot) =>
					forEach((t: Therapist) => {
						const patientPermutations = initializePatientPermutations(d, s, t, patients);
						const positioningPermutations = initializePositioningPermutations(d, s, t);
						permutations.push(...patientPermutations);
						permutations.push(...positioningPermutations);
					}, therapists),
				slots
			),
		days
	);

	return permutations;
};

const initializePatientPermutations = (
	day: Day,
	slot: Slot,
	therapist: Therapist,
	patients: Patient[]
) => {
	const permutations: Permutation[] = [];

	forEach((p: Patient) => {
		if (
			isAvailable(day, slot, therapist.availabilities) &&
			isAvailable(day, slot, p.availabilities) &&
			!isExcluded(therapist, p)
		) {
			permutations.push({
				day: day,
				group: slot.group,
				slot: slot,
				therapist: therapist,
				session: p
			});
		}
	}, patients);

	return permutations;
};

const initializePositioningPermutations = (day: Day, slot: Slot, therapist: Therapist) => {
	const permutations: Permutation[] = [];

	if (isAvailable(day, slot, therapist.availabilities)) {
		permutations.push({
			day: day,
			group: slot.group,
			slot: slot,
			therapist: therapist,
			session: 'P'
		});
	}

	return permutations;
};

export default initializePermutations;
