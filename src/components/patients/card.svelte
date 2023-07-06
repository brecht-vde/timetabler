<script lang="ts">
	import type { Patient } from '../../logic/types';
	import Schedules from '../schedules/schedules.svelte';

	export let patient: Patient;
</script>

<div>
	<p>{patient.label}</p>
	<Schedules availabilities={patient.availabilities} />
</div>
