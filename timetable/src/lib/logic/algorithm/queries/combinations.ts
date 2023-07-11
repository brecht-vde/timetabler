import { map } from 'ramda';
import type { Combination, Gene } from '../types';

export const getAlreadyAssignedTherapistPatientCombinations = (genes: Gene[]) => {
	return map((g: Gene) => {
		const combo: Combination = {
			therapist: g.therapist,
			patient: g.patient
		};

		return combo;
	})(genes);
};
