<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="page-container flex flex-row justify-between p-4">
			<h1 class="h3">Timetabler</h1>
			<LightSwitch />
		</div>
	</svelte:fragment>
	<div class="page-container">
		<slot />
	</div>
	<svelte:fragment slot="footer">
		<div class="page-container flex flex-row justify-center p-4">© Brecht Van der Elst</div>
	</svelte:fragment>
</AppShell>
