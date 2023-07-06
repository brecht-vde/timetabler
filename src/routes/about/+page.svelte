<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Patient } from '../../logic/types';
	import { patients } from '../../stores/patients-store';
	import Repeater from '../../components/repeater.svelte';
</script>

<Repeater items={$patients} let:item={patient}>
	<p>{patient.label}</p>
</Repeater>
