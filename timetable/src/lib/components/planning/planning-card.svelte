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
		<PlanningList label="insufficient" items={planning.insufficient} />
		<PlanningList label="unassigned" items={planning.unassigned} />
	</footer>
</div>
