<script lang="ts" context="module">
	export interface AvailabilityChanged extends CustomEventInit {
		availability: Availability;
	}
</script>

<script lang="ts">
	import { Days, Slots } from '$lib/data/data';
	import type { Availability, Slot } from '$lib/logic/domain/types';
	import { ascend, find, groupBy, map, pipe, sort, toPairs } from 'ramda';
	import Checkbox from '../common/checkbox.svelte';
	import { createEventDispatcher } from 'svelte';

	// Variables
	export let availabilities: Availability[];

	// Logic
	const groups: [string, Availability[]][] = pipe(
		groupBy<Availability>((a) => a.slot.toString()),
		toPairs,
		map<[string, unknown], [string, Availability[]]>(([key, group]) => [
			key,
			sort(
				ascend((a: Availability) => a.day),
				group as Availability[]
			)
		])
	)(availabilities) as [string, Availability[]][];

	const getSlotLabel = (id: string) =>
		pipe(
			find((s: Slot) => s.id === parseInt(id)),
			(s: Slot | undefined) => s?.label || 'N/A'
		)(Slots);

	// Events
	const dispatch = createEventDispatcher();

	const availabilityChanged = (availability: Availability) => {
		const event: AvailabilityChanged = {
			availability: {
				...availability,
				available: !availability.available
			}
		};

		dispatch('availabilitychanged', event);
	};
</script>

<div class="table-container">
	<table class="table table-compact">
		<thead>
			<tr>
				<th class="table-cell-fit" />
				{#each Days as day}
					<th class="table-cell-fit">{day.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each groups as [key, group]}
				<tr>
					<th class="table-cell-fit">{getSlotLabel(key)}</th>
					{#each group as availability}
						<td class="table-cell-fit">
							<Checkbox
								class="checkbox"
								checked={availability.available}
								on:change={() => availabilityChanged(availability)}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
