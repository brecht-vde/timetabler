<script lang="ts">
	type T = $$Generic;
	export let items: T[];
</script>

{#each items as item}
    <slot {item} />
{/each}