<script lang="ts">
	import PlanningCard from '$lib/components/planning/planning-card.svelte';
	import { Days, Slots } from '$lib/data/data';
	import { Algorithm } from '$lib/logic/algorithm/algorithm';
	import type { Planning } from '$lib/logic/algorithm/types';
	import type { Patient, Therapist } from '$lib/logic/domain/types';

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
					available: false
				},
				{
					day: 1,
					slot: 5,
					available: false
				},
				{
					day: 1,
					slot: 6,
					available: false
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
					available: false
				}
			]
		},
		{
			id: 3,
			label: 'T3',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: false
				},
				{
					day: 1,
					slot: 2,
					available: false
				},
				{
					day: 1,
					slot: 3,
					available: false
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
			label: 'T4',
			dedicated: 1,
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
			label: 'T5',
			dedicated: 2,
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
					available: false
				},
				{
					day: 1,
					slot: 2,
					available: false
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
					available: false
				},
				{
					day: 1,
					slot: 4,
					available: false
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
					available: false
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
					available: false
				},
				{
					day: 1,
					slot: 2,
					available: false
				},
				{
					day: 1,
					slot: 3,
					available: true
				},
				{
					day: 1,
					slot: 4,
					available: false
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
					available: false
				},
				{
					day: 1,
					slot: 3,
					available: false
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
			id: 6,
			label: 'P6',
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
					available: false
				},
				{
					day: 1,
					slot: 4,
					available: true
				},
				{
					day: 1,
					slot: 5,
					available: false
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		},
		{
			id: 7,
			label: 'P7',
			availabilities: [
				{
					day: 1,
					slot: 1,
					available: false
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
					available: false
				},
				{
					day: 1,
					slot: 6,
					available: true
				}
			]
		}
	];

	console.time('handle');
	const algo = new Algorithm(Days, Slots, therapists, patients);
	const planning: Planning = algo.execute(Days[0], 250);
	console.timeEnd('handle');
</script>

<PlanningCard {planning} />
