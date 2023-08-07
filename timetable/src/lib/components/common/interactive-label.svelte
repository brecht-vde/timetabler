<script lang="ts">
	import Button from './button.svelte';
	import Textbox from './textbox.svelte';

	export let actionLabel: string;
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
			on:blur={() => onToggleEditMode(false)}
		/>
	</div>

	{#if editMode}
		<div>
			<Button
				class="btn btn-sm variant-filled-secondary"
				on:click={() => onToggleEditMode(false)}
				on:click
			>
				{actionLabel}
			</Button>
		</div>
	{/if}
</div>
