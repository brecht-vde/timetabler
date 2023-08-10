<script lang="ts">
	import type { Planning } from '$lib/logic/algorithm/types';
	import PlanningList from './planning-list.svelte';
	import PlanningTable from './planning-table.svelte';

	export let planning: Planning;
</script>

<div class="card">
	<header class="card-header">
		<h1>{planning.day}</h1>
	</header>
	<section class="p-4">
		<PlanningTable grid={planning.data} />
	</section>
	<footer class="card-footer">
		<PlanningList
			style="variant-ghost-warning"
			tooltip="These patients only got assigned therapy once."
			items={planning.insufficient}
		/>
		<PlanningList
			style="variant-ghost-error"
			tooltip="These patients did not get assigned any therapy."
			items={planning.unassigned}
		/>
	</footer>
</div>
