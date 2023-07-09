<script lang="ts">
	import { UpdateAvailability } from '../../logic/actions/therapists';
	import type { Therapist } from '../../logic/types';
	import Schedules from '../schedules/schedules.svelte';

	export let therapist: Therapist;

	const OnAvailabilityChanged = (
		e: CustomEvent<{ day: number; slot: number; available: boolean }>
	) => {
		UpdateAvailability(therapist.id, e.detail.day, e.detail.slot, e.detail.available);
	};
</script>

<div>
	<p>{therapist.label}</p>
	<Schedules
		availabilities={therapist.availabilities}
		on:availabilitychanged={OnAvailabilityChanged}
	/>
</div>
