<script lang="ts">
	export let checked: boolean = false;
</script>

<label>
	<input type="checkbox" bind:checked on:change {...$$restProps} />
	<slot />
</label>
