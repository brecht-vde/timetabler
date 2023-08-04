<script lang="ts">
	export let label: string;
	export let items: string[];
</script>

{#if items}
	<p>
		<span>{label}:</span>
		<span>{items.join(',')}</span>
	</p>
{/if}
