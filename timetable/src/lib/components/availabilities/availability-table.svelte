<script lang="ts">
	import { Days, Slots } from '$lib/data/data';
	import type { Availability } from '$lib/logic/domain/types';
	import { find } from 'ramda';
	import Checkbox from '../common/checkbox.svelte';

	export let availabilities: Availability[];

	const findAvailability = (day: number, slot: number) =>
		find((a: Availability) => a.day === day && a.slot === slot, availabilities);

	const onCheckedChanged = (availability: Availability | undefined) => {
		if (availability) {
			alert(JSON.stringify(availability));
		}
	};
</script>

<div class="table-container">
	<table class="table">
		<thead>
			<tr>
				<th />
				{#each Days as day}
					<th>{day.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each Slots as slot}
				<tr>
					<th>{slot.label}</th>
					{#each Days as day}
						<td>
							<Checkbox
								class="checkbox"
								checked={findAvailability(day.id, slot.id)?.available}
								on:change={() => onCheckedChanged(findAvailability(day.id, slot.id))}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
