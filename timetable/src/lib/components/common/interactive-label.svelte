<script lang="ts">
	import { Save } from 'lucide-svelte';
	import Button from './button.svelte';
	import Textbox from './textbox.svelte';

	export let placeholder: string;
	export let value: string;
	let editMode: boolean = false;

	const onToggleEditMode = (value: boolean) => {
		editMode = value;
	};
</script>

<div class="flex flex-row justify-between gap-2">
	<div>
		<Textbox
			{placeholder}
			bind:value
			class="input variant-transparent p-1"
			on:focus={() => onToggleEditMode(true)}
		/>
	</div>

	{#if editMode}
		<div>
			<Button
				class="btn btn-icon btn-icon-sm variant-ghost-secondary"
				on:click={() => onToggleEditMode(false)}
				on:click
			>
				<Save class="icon-sm" />
			</Button>
		</div>
	{/if}
</div>
