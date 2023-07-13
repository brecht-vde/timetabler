import { groupBy, values, isNil, pipe, map, count, countBy } from 'ramda';
import type { Chromosome, Gene } from './types';

export const calculateFitness = (chromosome: Chromosome) => {
	let fitness = 0.0;

	// time slot has a lot of unassigned slots.
	const genesBySlot = pipe(
		groupBy((g: Gene) => g.slot.toString()),
		values,
		map((g: Gene[] | undefined) => (isNil(g) ? [] : g))
	)(chromosome.genes);

	for (const genes of genesBySlot) {
		const unassigned = count((g: Gene) => g.patient === -2, genes);
		fitness -= Math.pow(unassigned, 2);
	}

	// therapist has a lot of unassigned slots.
	const genesByTherapist = pipe(
		groupBy((g: Gene) => g.therapist.toString()),
		values,
		map((g: Gene[] | undefined) => (isNil(g) ? [] : g))
	)(chromosome.genes);

	for (const genes of genesByTherapist) {
		const unassigned = count((g: Gene) => g.patient === -2, genes);
		const positioning = count((g: Gene) => g.patient < -2, genes);

		fitness -= Math.pow(unassigned + positioning, 2);
	}

	// patients have not be assigned at all
	fitness -= Math.pow(chromosome.unassigned.length, 2);

	// unassigned patient occurs more than once
	const duplicates = values(countBy((u: number) => u, chromosome.unassigned)).length;
	fitness -= Math.pow(duplicates, 2);

	console.log(fitness);

	return fitness;
};
