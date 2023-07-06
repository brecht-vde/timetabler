<script lang="ts">
	import type { Therapist } from '../../logic/types';
	import Schedules from '../schedules/schedules.svelte';

	export let therapist: Therapist;
</script>

<div>
	<p>{therapist.label}</p>
	<Schedules availabilities={therapist.availabilities} />
</div>
