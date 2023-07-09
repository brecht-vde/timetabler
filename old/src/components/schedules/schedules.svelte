<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Days, Slots } from '../../data/data';
	import type { Availability, Day, Slot } from '../../logic/types';
	import Checkbox from '../checkbox.svelte';
	import { groupBy, uniq, pipe, toPairs, ascend, sort, map, find, propEq, isNotNil } from 'ramda';

	export let availabilities: Availability[] = [];

	const days = uniq<Day>(Days);
	const slots = uniq<Slot>(Slots);

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

	const getSlotLabel = (id: string) => {
		const slot: Slot | undefined = find(propEq(parseInt(id), 'id'), slots);

		if (isNotNil(slot)) {
			return slot.label;
		}

		return 'N/A';
	};

	const dispatcher = createEventDispatcher();

	const toggle = (day: number, slot: number, available: boolean) => {
		dispatcher('availabilitychanged', {
			day: day,
			slot: slot,
			available: available
		});
	};
</script>

<table>
	<thead>
		<tr>
			<th />
			{#each days as day}
				<th>{day.label}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each groups as [key, group]}
			<tr>
				<th>{getSlotLabel(key)}</th>
				{#each group as availability}
					<td>
						<Checkbox
							checked={availability.available}
							on:change={() => toggle(availability.day, availability.slot, !availability.available)}
						/>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
