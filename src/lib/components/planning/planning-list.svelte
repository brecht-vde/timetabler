<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { HelpCircle } from 'lucide-svelte';

	export let tooltip: string;
	export let style: string;
	export let items: string[];

	const popupTarget = `tooltip_${tooltip}`;

	const popupTooltip: PopupSettings = {
		event: 'click',
		target: popupTarget,
		placement: 'top'
	};
</script>

{#if items}
	<div class="flex flex-row gap-1">
		<button class="badge-icon {style}" use:popup={popupTooltip}>
			<HelpCircle class="icon-sm" />
		</button>

		<span>:</span>
		<span>{items.join(',')}</span>
	</div>
	<div class="card p-4 w-72 shadow-xl variant-filled-surface" data-popup={popupTarget}>
		<div><p>{tooltip}</p></div>
		<div class="arrow variant-filled-surface" />
	</div>
{/if}
