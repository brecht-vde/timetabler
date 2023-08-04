<script lang="ts">
	import type { Grid } from '$lib/logic/algorithm/types';
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
						<td>{grid.cells[row][column]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
