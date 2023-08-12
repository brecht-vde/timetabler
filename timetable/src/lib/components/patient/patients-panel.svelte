<script lang="ts">
	import Button from '$lib/components/common/button.svelte';
	import PatientCard from '$lib/components/patient/patient-card.svelte';
	import { Availabilities } from '$lib/data/data';
	import { Patient } from '$lib/logic/domain/types';
	import { createPatient, patientsStore } from '$lib/stores/patients-store';

	const onCreatePatient = () => {
		createPatient(Patient.createPatient('Patient', Availabilities));
	};
</script>

<div class="panel-container-columns">
	<div>
		<Button class="btn btn-sm variant-filled-secondary" on:click={onCreatePatient}>Add</Button>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
		{#each Object.values($patientsStore) as patient (patient.id)}
			<PatientCard {patient} />
		{/each}
	</div>
</div>
