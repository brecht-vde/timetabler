<script lang="ts">
	import Button from '../components/button.svelte';
	import PCard from '../components/patients/card.svelte';
	import TCard from '../components/therapists/card.svelte';
	import Repeater from '../components/repeater.svelte';
	import { Create as PCreate } from '../logic/actions/patients';
	import { Create as TCreate } from '../logic/actions/therapists';
	import { patients } from '../stores/patients-store';
	import { therapists } from '../stores/therapists-store';
</script>

<Button on:click={() => PCreate()}>+</Button>

<Repeater items={$patients} let:item={patient}>
	<PCard {patient} />
</Repeater>

<hr />

<Button on:click={() => TCreate()}>+</Button>

<Repeater items={$therapists} let:item={therapist}>
	<TCard {therapist} />
</Repeater>
