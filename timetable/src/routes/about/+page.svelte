<script lang="ts">
	import { Algorithm } from '$lib/logic/algorithmv2/algorithm';
	import { PermutationHandler } from '$lib/logic/algorithmv2/permutation-handler';
	import type { Permutation, Solution } from '$lib/logic/algorithmv2/types';
	import { isPatient } from '$lib/logic/algorithmv2/utilities';
	import type { Patient, Slot, Therapist } from '$lib/logic/domain/types';
	import { json } from '@sveltejs/kit';
	import { map } from 'ramda';

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

	// const therapists: Therapist[] = [
	// 	{
	// 		id: 1,
	// 		label: 'T1',
	// 		availabilities: [
	// 			{
	// 				day: 1,
	// 				slot: 1,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 2,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 3,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 4,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 5,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 6,
	// 				available: true
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 2,
	// 		label: 'T2',
	// 		availabilities: [
	// 			{
	// 				day: 1,
	// 				slot: 1,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 2,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 3,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 4,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 5,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 6,
	// 				available: true
	// 			}
	// 		]
	// 	}
	// ];

	// const patients: Patient[] = [
	// 	{
	// 		id: 1,
	// 		label: 'P1',
	// 		availabilities: [
	// 			{
	// 				day: 1,
	// 				slot: 1,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 2,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 3,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 4,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 5,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 6,
	// 				available: true
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 2,
	// 		label: 'P2',
	// 		availabilities: [
	// 			{
	// 				day: 1,
	// 				slot: 1,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 2,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 3,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 4,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 5,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 6,
	// 				available: true
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 3,
	// 		label: 'P3',
	// 		availabilities: [
	// 			{
	// 				day: 1,
	// 				slot: 1,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 2,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 3,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 4,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 5,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 6,
	// 				available: true
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 4,
	// 		label: 'P4',
	// 		availabilities: [
	// 			{
	// 				day: 1,
	// 				slot: 1,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 2,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 3,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 4,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 5,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 6,
	// 				available: true
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 5,
	// 		label: 'P5',
	// 		availabilities: [
	// 			{
	// 				day: 1,
	// 				slot: 1,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 2,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 3,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 4,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 5,
	// 				available: true
	// 			},
	// 			{
	// 				day: 1,
	// 				slot: 6,
	// 				available: true
	// 			}
	// 		]
	// 	}
	// ];

	console.time('handle');
	const algo = new Algorithm(slots, therapists, patients);
	const items: Solution = algo.execute(100);
	items.permutations;
	console.timeEnd('handle');

	const mapped = map(
		(p: Permutation) =>
			`${p.slot.label} - ${p.therapist.label} - ${
				isPatient(p.session) ? (p.session as Patient).label : p.session
			}`,
		items.permutations
	);
</script>

{#each mapped as value}
	<p>{value}</p>
{/each}
