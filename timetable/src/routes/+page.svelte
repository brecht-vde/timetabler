<script lang="ts">
	import PlanningCard from '$lib/components/planning/planning-card.svelte';
	import { Days, Slots } from '$lib/data/data';
	import { Algorithm } from '$lib/logic/algorithm/algorithm';
	import type { Planning } from '$lib/logic/algorithm/types';
	import { Therapist, Patient } from '$lib/logic/domain/types';

	const therapists: Therapist[] = [];
	const patients: Patient[] = [];

	patients.push(
		Patient.createPatient('P1', [
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
		])
	);
	patients.push(
		Patient.createPatient('P2', [
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
		])
	);
	patients.push(
		Patient.createPatient('P3', [
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
		])
	);
	patients.push(
		Patient.createPatient('P4', [
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
		])
	);
	patients.push(
		Patient.createPatient('P5', [
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
		])
	);
	patients.push(
		Patient.createPatient('P6', [
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
		])
	);
	patients.push(
		Patient.createPatient('P7', [
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
		])
	);

	therapists.push(
		Therapist.createTherapist('T1', [
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
		])
	);

	therapists.push(
		Therapist.createTherapist('T2', [
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
		])
	);

	therapists.push(
		Therapist.createTherapist('T3', [
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
		])
	);

	therapists.push(
		Therapist.createTherapist(
			'T4',
			[
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
			],
			[patients[0].id]
		)
	);

	therapists.push(
		Therapist.createTherapist(
			'T5',
			[
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
			],
			[patients[1].id]
		)
	);

	console.time('handle');
	const algo = new Algorithm(Days, Slots, therapists, patients);
	const planning: Planning = algo.execute(Days[0], 250);
	console.timeEnd('handle');
</script>

<PlanningCard {planning} />
