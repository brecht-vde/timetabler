<script>
	import { drawerStore } from '@skeletonlabs/skeleton';
	import Button from '../common/button.svelte';
	import { consent, dissent } from '$lib/stores/gdpr-store';

	const onDecline = () => {
		dissent();
		drawerStore.close();
	};

	const onConsent = () => {
		consent();
		drawerStore.close();
	};
</script>

<div class="flex flex-col gap-2">
	<div>
		<h1 class="h3">Can we use cookies to generate timetables?</h1>
		<p class="text-xs">It's all client-side, data you enter is not tracked.</p>
	</div>
	<div class="flex justify-end gap-4">
		<Button class="btn btn-sm variant-ghost-primary" on:click={onDecline}>Nope</Button>
		<Button class="btn btn-sm variant-filled-secondary" on:click={onConsent}>Sure!</Button>
	</div>
</div>
