import { filter, forEach, isNotNil, none, sortBy } from 'ramda';
import type { Patient, Slot, Therapist } from '../domain/types';
import type { Permutation } from './types';
import {
	IsPatientAssignedForGroup,
	IsPositioningAssignedForSlot,
	IsSessionAssignedForTherapist,
	IsSlotAssigned,
	getGroups,
	isAvailable,
	isDedicatedAssigned,
	isExcluded,
	isPatient,
	selectRandom,
	sortBySlotThenByTherapist
} from './utilities';

export class PermutationHandler {
	private readonly _slots: Slot[];
	private readonly _therapists: Therapist[];
	private readonly _patients: Patient[];
	private readonly _groups: number[];

	private readonly _permutations: Permutation[] = [];
	private _selected: Permutation[] = [];

	constructor(slots: Slot[], therapists: Therapist[], patients: Patient[], groups: number[]) {
		this._slots = slots;
		this._therapists = therapists;
		this._patients = patients;
		this._groups = groups;

		this.calculatePermutations();
	}

	public handle() {
		this.assignPermutations();
		this.assignRemainingPermutations();

		const sorted = sortBySlotThenByTherapist(this._selected);

		this._selected.length = 0;

		return sorted;
	}

	// initialization
	private calculatePermutations() {
		forEach(
			(s: Slot) =>
				forEach((t: Therapist) => {
					this.calculatePositioningPermutations(s, t);
					this.calculatePatientPermutations(s, t);
				}, this._therapists),
			this._slots
		);
	}

	private calculatePatientPermutations(slot: Slot, therapist: Therapist) {
		forEach((p: Patient) => {
			if (
				isAvailable(slot, therapist.availabilities) &&
				isAvailable(slot, p.availabilities) &&
				!isExcluded(therapist, p)
			) {
				this._permutations.push({
					group: slot.group,
					slot: slot,
					therapist: therapist,
					session: p
				});
			}
		}, this._patients);
	}

	private calculatePositioningPermutations(slot: Slot, therapist: Therapist) {
		if (isAvailable(slot, therapist.availabilities)) {
			this._permutations.push({
				group: slot.group,
				slot: slot,
				therapist: therapist,
				session: 'P'
			});
		}
	}

	// assignment
	private assignPermutations() {
		forEach((g: number) => {
			const slotsCount = filter((s: Slot) => s.group === g, this._slots).length;

			for (let index = 0; index < slotsCount; index++) {
				forEach((t: Therapist) => {
					const selected = this.selectPermutation(g, t);
					if (selected) this._selected.push(selected);
				}, this._therapists);
			}
		}, this._groups);
	}

	private assignRemainingPermutations() {
		forEach(
			(s: Slot) =>
				forEach((t: Therapist) => {
					this.assignUnavailablePermutation(s, t);
					this.assignOpenPermutation(s, t);
				}, this._therapists),
			this._slots
		);
	}

	private assignUnavailablePermutation(s: Slot, t: Therapist) {
		if (!isAvailable(s, t.availabilities)) {
			this._selected.push({
				group: s.group,
				slot: s,
				therapist: t,
				session: 'U'
			});
		}
	}

	private assignOpenPermutation(s: Slot, t: Therapist) {
		if (none((p: Permutation) => p.slot === s && p.therapist === t, this._selected)) {
			this._selected.push({
				group: s.group,
				slot: s,
				therapist: t,
				session: 'O'
			});
		}
	}

	// selection
	private selectPermutation(group: number, therapist: Therapist) {
		let selected: Permutation | null = null;

		selected = this.trySelectDedicated(group, therapist);

		if (selected) return selected;

		selected = this.trySelectAny(group, therapist);

		return selected;
	}

	private trySelectAny(group: number, therapist: Therapist) {
		const filtered = filter(
			(p: Permutation) =>
				p.group === group &&
				p.therapist === therapist &&
				!IsPatientAssignedForGroup(this._selected, p.session, group) &&
				!IsSessionAssignedForTherapist(this._selected, p.session, therapist) &&
				!IsSlotAssigned(this._selected, therapist, p.slot) &&
				!IsPositioningAssignedForSlot(this._selected, p.session, p.slot),
			this._permutations
		);

		const selected = selectRandom(filtered);
		return selected;
	}

	private trySelectDedicated(group: number, therapist: Therapist) {
		if (!therapist.dedicated) return null;

		const filtered = filter(
			(p: Permutation) =>
				isNotNil(therapist.dedicated) &&
				!isDedicatedAssigned(this._selected, therapist) &&
				p.group === group &&
				p.therapist.id === therapist.id &&
				isPatient(p.session) &&
				(p.session as Patient).id === therapist.dedicated,
			this._permutations
		);

		const selected = selectRandom(filtered);
		return selected;
	}
}
