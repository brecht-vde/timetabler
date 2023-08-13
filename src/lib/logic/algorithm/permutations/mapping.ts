import type { Day, Patient } from '$lib/logic/domain/types';
import { map, uniq } from 'ramda';
import type { Cells, Grid, Permutation, Planning } from '../types';
import { isPatient } from './utilities';

const mapToPlanning = (
	day: Day,
	fitness: number,
	permutations: Permutation[],
	insufficient: Patient[],
	unassigned: Patient[]
) => {
	const planning: Planning = {
		id: day.id,
		day: day.longlabel,
		fitness: fitness,
		data: mapToGrid(permutations),
		insufficient: mapToNames(insufficient),
		unassigned: mapToNames(unassigned)
	};

	return planning;
};

const mapToNames = (patients: Patient[]) => map((p: Patient) => p.label, patients);

const mapToGrid = (permutations: Permutation[]) => {
	const grid: Grid = {
		columns: mapToColumns(permutations),
		rows: mapToRows(permutations),
		cells: mapTocells(permutations)
	};

	return grid;
};

const mapToColumns = (permutations: Permutation[]) =>
	uniq(map((p: Permutation) => p.therapist.label, permutations));

const mapToRows = (permutations: Permutation[]) =>
	uniq(map((p: Permutation) => p.slot.label, permutations));

const mapTocells = (permutations: Permutation[]) => {
	const cells: Cells = {};

	permutations.forEach((element) => {
		const row = element.slot.label;
		const column = element.therapist.label;
		const value = isPatient(element.session)
			? (element.session as Patient).label
			: element.session.toString();

		if (!cells[row]) {
			cells[row] = {};
		}

		cells[row][column] = value;
	});

	return cells;
};

export default mapToPlanning;
