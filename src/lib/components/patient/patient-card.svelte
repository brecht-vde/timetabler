<script lang="ts">
	import type { Availability, Patient } from '$lib/logic/domain/types';
	import { deletePatient, updateAvailability, updatePatient } from '$lib/stores/patients-store';
	import AvailabilityTable from '../availabilities/availability-table.svelte';
	import Button from '../common/button.svelte';
	import InteractiveLabel from '../common/interactive-label.svelte';
	import { Trash2 } from 'lucide-svelte';

	// Variables
	export let patient: Patient;
	let label: string = patient.label || 'Patient';

	// Events
	const onAvailabilityChanged = (patient: Patient, availability: Availability) => {
		updateAvailability(patient.id, availability);
	};

	const onDeletePatient = () => {
		deletePatient(patient.id);
	};

	const onUpdatePatient = () => {
		patient.label = label;
		updatePatient(patient.id, patient);
	};
</script>

<div class="card">
	<header class="card-header">
		<div class="flex flex-row gap-4 justify-between">
			<InteractiveLabel placeholder="Patient" on:click={onUpdatePatient} bind:value={label} />
			<div>
				<Button class="btn btn-icon btn-icon-sm variant-ghost-tertiary" on:click={onDeletePatient}>
					<Trash2 class="icon-sm" />
				</Button>
			</div>
		</div>
	</header>
	<section class="p-4">
		<AvailabilityTable
			label="Availability"
			availabilities={patient.availabilities}
			on:availabilitychanged={(e) => onAvailabilityChanged(patient, e.detail.availability)}
		/>
	</section>
</div>
