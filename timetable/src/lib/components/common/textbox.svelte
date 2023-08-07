<script lang="ts">
	export let placeholder: string;
	export let value: string;
</script>

<input
	class="input"
	type="text"
	{placeholder}
	on:focus
	on:focus
	on:blur
	bind:value
	on:keydown
	{...$$restProps}
/>
