<script lang="ts">
	import { Algorithm, type Solution } from '../../logic/algorithm';
	import type { Slot, Patient, Therapist } from '../../logic/types';

	const slots: Slot[] = [
		{
			group: 1,
			id: 1,
			label: '9-10'
		},
		{
			group: 1,
			id: 2,
			label: '10-11'
		},
		{
			group: 1,
			id: 3,
			label: '11-12'
		},
		{
			group: 2,
			id: 4,
			label: '13-14'
		},
		{
			group: 2,
			id: 5,
			label: '14-15'
		},
		{
			group: 2,
			id: 6,
			label: '15-16'
		}
	];

	const therapists: Therapist[] = [
		{
			id: 1,
			label: 'T1',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: true
				},
				{
					day: 1,
					slot: 2,
					available: true
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: true
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		},
		{
			id: 2,
			label: 'T2',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: true
				},
				{
					day: 1,
					slot: 2,
					available: true
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: true
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		}
	];
	const patients: Patient[] = [
		{
			id: 1,
			label: 'P1',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: true
				},
				{
					day: 1,
					slot: 2,
					available: true
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: true
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		},
		{
			id: 2,
			label: 'P2',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: true
				},
				{
					day: 1,
					slot: 2,
					available: true
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: true
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		},
		{
			id: 3,
			label: 'P3',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: true
				},
				{
					day: 1,
					slot: 2,
					available: true
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: true
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		},
		{
			id: 4,
			label: 'P4',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: true
				},
				{
					day: 1,
					slot: 2,
					available: true
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: true
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		},
		{
			id: 5,
			label: 'P5',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: true
				},
				{
					day: 1,
					slot: 2,
					available: true
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: true
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		}
	];

	const algorithm = new Algorithm(slots, therapists, patients);
	const solution: Solution = algorithm.calculate();
</script>

<a href="/">back</a>

<h1>assigned</h1>
{#each solution.individual.genes as gene}
	<p>{gene.slot} - {gene.therapist} - {gene.patient}</p>
{/each}

<h1>unassigned</h1>
{#each solution.unassigned as unassigned}
	<p>{unassigned}</p>
{/each}
