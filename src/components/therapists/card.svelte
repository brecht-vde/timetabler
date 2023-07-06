<script lang="ts">
	import type { Therapist } from '../../logic/types';
	import Schedules from '../schedules/schedules.svelte';

	export let therapist: Therapist;

	const OnAvailabilityChanged = (
		e: CustomEvent<{ day: number; slot: number; available: boolean }>
	) => {
		alert(
			`Thera: ${therapist.id} - D: ${e.detail.day} - S: ${e.detail.slot} - A: ${e.detail.available}`
		);
	};
</script>

<div>
	<p>{therapist.label}</p>
	<Schedules
		availabilities={therapist.availabilities}
		on:availabilitychanged={OnAvailabilityChanged}
	/>
</div>
