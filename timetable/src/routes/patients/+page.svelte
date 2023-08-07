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

<div class="flex flex-row justify-between">
	<h1>Patients</h1>
	<Button class="btn-icon variant-filled-primary" on:click={onCreatePatient}>+</Button>
</div>

<div class="grid grid-cols-5 gap-4">
	{#each Object.values($patientsStore) as patient (patient.id)}
		<PatientCard {patient} />
	{/each}
</div>
