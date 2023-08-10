<script lang="ts">
	import type { Grid } from '$lib/logic/algorithm/types';
	import { MinusCircle, ParkingCircle, PlusCircle } from 'lucide-svelte';
	export let grid: Grid;
</script>

<div class="table-container">
	<table class="table">
		<thead>
			<tr>
				<th />
				{#each grid.columns as column}
					<th>{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each grid.rows as row}
				<tr>
					<th>{row}</th>
					{#each grid.columns as column}
						<td>
							{#if grid.cells[row][column] === 'U'}
								<div class="badge-icon variant-ghost-error">
									<MinusCircle class="icon-sm" />
								</div>
							{:else if grid.cells[row][column] === 'O'}
								<div class="badge-icon variant-ghost-success">
									<PlusCircle class="icon-sm" />
								</div>
							{:else if grid.cells[row][column] === 'P'}
								<div class="badge-icon variant-ghost-warning">
									<ParkingCircle class="icon-sm" />
								</div>
							{:else}
								{grid.cells[row][column]}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
