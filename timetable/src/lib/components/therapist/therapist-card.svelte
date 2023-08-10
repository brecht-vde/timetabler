<script lang="ts">
	import type { Availability, Therapist } from '$lib/logic/domain/types';
	import {
		deleteTherapist,
		updateAvailability,
		updateTherapist
	} from '$lib/stores/therapists-store';
	import AvailabilityTable from '../availabilities/availability-table.svelte';
	import Button from '../common/button.svelte';
	import InteractiveLabel from '../common/interactive-label.svelte';
	import { Trash2 } from 'lucide-svelte';
	import PatientSelector, { type PatientChanged } from '../patient/patient-selector.svelte';
	import { filter } from 'ramda';

	// Variables
	export let therapist: Therapist;
	let label: string = therapist.label || 'Therapist';

	// Events
	const onAvailabilityChanged = (availability: Availability) => {
		updateAvailability(therapist.id, availability);
	};

	const onDeleteTherapist = () => {
		deleteTherapist(therapist.id);
	};

	const onUpdateTherapist = () => {
		therapist.label = label;
		updateTherapist(therapist.id, therapist);
	};

	const onUpdateDedicatedPatient = (detail: PatientChanged) => {
		therapist.dedicated = detail.action === 'add' ? detail.patient.id : undefined;
		updateTherapist(therapist.id, therapist);
	};

	const onUpdateExcludedPatient = (detail: PatientChanged) => {
		if (!therapist.excluded) {
			therapist.excluded = [];
		}

		if (detail.action === 'remove') {
			therapist.excluded = filter((id: string) => id !== detail.patient.id, therapist.excluded);
		} else if (detail.action === 'add') {
			therapist.excluded.push(detail.patient.id);
		}

		updateTherapist(therapist.id, therapist);
	};
</script>

<div class="card">
	<header class="card-header">
		<div class="flex flex-row gap-4 justify-between">
			<InteractiveLabel placeholder="Therapist" on:click={onUpdateTherapist} bind:value={label} />
			<div>
				<Button class="btn btn-icon btn-icon-sm variant-ghost-error" on:click={onDeleteTherapist}>
					<Trash2 class="icon-sm" />
				</Button>
			</div>
		</div>
	</header>
	<section class="flex flex-col p-4 gap-4">
		<PatientSelector
			multi={false}
			label="Dedicated patient"
			selectedIds={therapist.dedicated ? [therapist.dedicated] : []}
			on:patientchanged={(e) => onUpdateDedicatedPatient(e.detail)}
		/>
		<PatientSelector
			multi={true}
			label="Excluded patients"
			selectedIds={therapist.excluded ? therapist.excluded : []}
			on:patientchanged={(e) => onUpdateExcludedPatient(e.detail)}
		/>
		<AvailabilityTable
			label="Availability"
			availabilities={therapist.availabilities}
			on:availabilitychanged={(e) => onAvailabilityChanged(e.detail.availability)}
		/>
	</section>
</div>
