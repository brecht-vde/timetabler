<script lang="ts">
	import type { Planning } from '../../logic/types';
	import Repeater from '../repeater.svelte';

	const values = [
		['Karolina', 'Brecht', 'X', 'Alex', 'U'],
		['P', 'Alice', 'Jerome', 'Tucker', 'Sophie'],
		['Vance', 'Cornelius', 'Artemis', 'Klara', 'June']
	];

	const sample: Planning[] = [
		{
			id: 1,
			label: 'Monday',
			values: values
		},
		{
			id: 2,
			label: 'Tuesday',
			values: values
		}
	];
</script>

<Repeater items={sample} let:item={s}>
	<p>{s.label}</p>
	<table>
		<thead>
            <th/>
			<th>Therapist 1</th>
			<th>Therapist 2</th>
			<th>Therapist 3</th>
			<th>Therapist 4</th>
			<th>Therapist 5</th>
		</thead>
		<tbody>
			<Repeater items={values} let:item={v}>
				<tr>
					<td>9-10</td>
					<Repeater items={v} let:item={p}>
						<td>{p}</td>
					</Repeater>
				</tr>
			</Repeater>
		</tbody>
	</table>
</Repeater>
