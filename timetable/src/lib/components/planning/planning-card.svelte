<script lang="ts">
	import type { Planning } from '$lib/logic/algorithm/types';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import PlanningList from './planning-list.svelte';
	import PlanningTable from './planning-table.svelte';
	import { addLock, removeLock, lockStore } from '$lib/stores/lock-store';
	import { Lock, Unlock } from 'lucide-svelte';
	import { any } from 'ramda';

	export let planning: Planning;

	let checked: boolean = any((id: number) => id === planning.id, $lockStore);

	const onLockChange = () => {
		if (checked) {
			addLock(planning.id);
		} else {
			removeLock(planning.id);
		}
	};
</script>

<div class="card">
	<header class="card-header">
		<div class="flex flex-row justify-between">
			<h1>{planning.day}</h1>
			<div class="flex flex-row justify-end gap-2">
				{#if checked}
					<Lock class="icon" />
				{:else}
					<Unlock class="icon" />
				{/if}
				<SlideToggle
					size="sm"
					background="bg-surface-400 dark:bg-surface-400"
					active="bg-primary-500"
					name="lock"
					on:change={onLockChange}
					bind:checked
				/>
			</div>
		</div>
	</header>
	<section class="p-4">
		<PlanningTable grid={planning.data} />
	</section>
	<footer class="card-footer">
		<PlanningList
			style="variant-ghost-secondary"
			tooltip="These patients only got assigned therapy once."
			items={planning.insufficient}
		/>
		<PlanningList
			style="variant-ghost-primary"
			tooltip="These patients did not get assigned any therapy."
			items={planning.unassigned}
		/>
	</footer>
</div>
