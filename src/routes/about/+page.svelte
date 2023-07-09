<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Patient } from '../../logic/types';
	import { patients } from '../../stores/patients-store';
	import Repeater from '../../components/repeater.svelte';
	import { therapists } from '../../stores/therapists-store';
</script>

<a href="/">back</a>
<a href="/planning">planning</a>

<Repeater items={$patients} let:item={patient}>
	<p>{patient.label}</p>
</Repeater>

<Repeater items={$therapists} let:item={therapist}>
	<p>{therapist.label}</p>
</Repeater>
