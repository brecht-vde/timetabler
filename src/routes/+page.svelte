<script lang="ts">
	import PatientsPanel from '$lib/components/patient/patients-panel.svelte';
	import PlanningsPanel from '$lib/components/planning/plannings-panel.svelte';
	import TherapistsPanel from '$lib/components/therapist/therapists-panel.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	let current: number = 0;
</script>

<TabGroup
	justify="justify-center"
	active="variant-filled-primary font-bold"
	hover="font-bold variant-outline-primary hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded="rounded-xl"
	border=""
	regionList="gap-4"
>
	<Tab bind:group={current} value={0} name="tab1">Patients</Tab>
	<Tab bind:group={current} value={1} name="tab2">Therapists</Tab>
	<Tab bind:group={current} value={2} name="tab3">Planning</Tab>
	<svelte:fragment slot="panel">
		{#if current === 0}
			<PatientsPanel />
		{:else if current === 1}
			<TherapistsPanel />
		{:else if current === 2}
			<PlanningsPanel />
		{/if}
	</svelte:fragment>
</TabGroup>
