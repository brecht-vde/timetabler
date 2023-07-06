<script lang="ts">
	type T = $$Generic;
	export let items: T[] = [];
</script>

{#if items && items.length > 0}
	{#each items as item (item)}
		{#if item}
			<slot {item} />
		{/if}
	{/each}
{/if}
