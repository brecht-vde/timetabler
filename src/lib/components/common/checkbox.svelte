<script lang="ts">
	export let checked: boolean = false;
</script>

<input type="checkbox" bind:checked on:change {...$$restProps} />
