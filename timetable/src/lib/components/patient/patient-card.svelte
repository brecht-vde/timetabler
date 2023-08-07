<script lang="ts">
	import type { Availability, Patient } from '$lib/logic/domain/types';
	import { deletePatient, updateAvailability } from '$lib/stores/patients-store';
	import AvailabilityTable from '../availabilities/availability-table.svelte';
	import Button from '../common/button.svelte';

	// Variables
	export let patient: Patient;

	// Events
	const onAvailabilityChanged = (patient: Patient, availability: Availability) => {
		updateAvailability(patient.id, availability);
	};

	const onDeletePatient = () => {
		deletePatient(patient.id);
	};
</script>

<div class="card">
	<header class="card-header">
		<div class="flex flex-row gap-4">
			<Button class="btn btn-sm variant-ghost-error" on:click={onDeletePatient}>❌</Button>
		</div>
	</header>
	<section class="p-4">
		<AvailabilityTable
			availabilities={patient.availabilities}
			on:availabilitychanged={(e) => onAvailabilityChanged(patient, e.detail.availability)}
		/>
	</section>
</div>
