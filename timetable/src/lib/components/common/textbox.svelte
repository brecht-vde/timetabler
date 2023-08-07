<script lang="ts">
	export let placeholder: string;
	let value: string;
</script>

<input class="input" type="text" {placeholder} bind:value {...$$restProps} />
