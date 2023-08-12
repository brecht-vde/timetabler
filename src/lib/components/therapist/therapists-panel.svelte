<script lang="ts">
	import Button from '$lib/components/common/button.svelte';
	import TherapistCard from '$lib/components/therapist/therapist-card.svelte';
	import { Availabilities } from '$lib/data/data';
	import { Therapist } from '$lib/logic/domain/types';
	import { createTherapist, therapistsStore } from '$lib/stores/therapists-store';

	const onCreateTherapist = () => {
		createTherapist(Therapist.createTherapist('Therapist', Availabilities));
	};
</script>

<div class="panel-container-columns">
	<div>
		<Button class="btn btn-sm variant-filled-secondary" on:click={onCreateTherapist}>Add</Button>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
		{#each Object.values($therapistsStore) as therapist (therapist.id)}
			<TherapistCard {therapist} />
		{/each}
	</div>
</div>
