<script lang="ts" context="module">
	export interface PatientChanged extends CustomEventInit {
		patient: Patient;
		action: 'add' | 'remove';
	}
</script>

<script lang="ts">
	import type { Patient } from '$lib/logic/domain/types';
	import { patientsStore } from '$lib/stores/patients-store';
	import { any } from 'ramda';
	import Checkbox from '../common/checkbox.svelte';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let selectedIds: string[];
	export let multi: boolean;

	// logic
	$: isChecked = (id: string) => any((sid: string) => sid === id, selectedIds);

	// Events
	const dispatch = createEventDispatcher();

	const onCheckChanged = (patient: Patient, e: Event) => {
		const checked = (e.target as HTMLInputElement)?.checked;

		if (!multi) {
			selectedIds.splice(0, 1);
			if (checked) {
				selectedIds.push(patient.id);
			}
		}

		const event: PatientChanged = {
			patient: patient,
			action: checked ? 'add' : 'remove'
		};

		dispatch('patientchanged', event);
	};
</script>

<div>
	<span class="label-sm">{label}</span>
</div>
<div class="grid grid-cols-2">
	{#each Object.values($patientsStore) as patient}
		<div>
			<Checkbox
				class="checkbox"
				checked={isChecked(patient.id)}
				on:change={(e) => onCheckChanged(patient, e)}
			/>
			{patient.label}
		</div>
	{/each}
</div>
