<script lang="ts">
	import { UpdateAvailability } from '../../logic/actions/patients';
	import type { Patient } from '../../logic/types';
	import Schedules from '../schedules/schedules.svelte';

	export let patient: Patient;

	const OnAvailabilityChanged = (
		e: CustomEvent<{ day: number; slot: number; available: boolean }>
	) => {
		UpdateAvailability(patient.id, e.detail.day, e.detail.slot, e.detail.available);
	};
</script>

<div>
	<p>{patient.label}</p>
	<Schedules
		availabilities={patient.availabilities}
		on:availabilitychanged={OnAvailabilityChanged}
	/>
</div>
