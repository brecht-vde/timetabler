<script lang="ts">
	import { Patient } from '$lib/logic/domain/types';
	import { createPatient } from '$lib/stores/patients-store';

	const onAddPatientClick = () => {
		const patient: Patient = Patient.createPatient('something', []);
		createPatient(patient);
	};
</script>

<button type="button" class="btn variant-filled-primary" on:click={onAddPatientClick}>+</button>
