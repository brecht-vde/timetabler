<script lang="ts">
	import Button from '$lib/components/common/button.svelte';
	import { Days, Slots } from '$lib/data/data';
	import { Algorithm } from '$lib/logic/algorithm/algorithm';
	import type { Planning } from '$lib/logic/algorithm/types';
	import { planningsStore } from '$lib/stores/plannings-store';
	import { patientsStore } from '$lib/stores/patients-store';
	import { therapistsStore } from '$lib/stores/therapists-store';
	import { any, difference, forEach, map } from 'ramda';
	import PlanningCard from './planning-card.svelte';
	import type { Day } from '$lib/logic/domain/types';
	import { setPlannings } from '$lib/stores/plannings-store';
	import { lockStore } from '$lib/stores/lock-store';

	const onGeneratePlanning = () => {
		const algorithm: Algorithm = new Algorithm(
			Days,
			Slots,
			Object.values($therapistsStore),
			Object.values($patientsStore)
		);

		const plannings: Planning[] = [];

		forEach((d: Day) => {
			if (any((id: number) => d.id === id, $lockStore)) return;

			const planning: Planning = algorithm.execute(d, 100);
			plannings.push(planning);
		}, Days);

		// const plannings = map((d: Day) => {
		// 	const planning: Planning = algorithm.execute(d, 100);
		// 	return planning;
		// }, Days);

		setPlannings(plannings);
	};
</script>

<div class="panel-container-columns">
	<div>
		<Button class="btn btn-sm variant-filled-secondary" on:click={onGeneratePlanning}
			>generate</Button
		>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
		{#each $planningsStore as planning}
			<PlanningCard {planning} />
		{/each}
	</div>
</div>
