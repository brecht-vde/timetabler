<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import {
		AppShell,
		Drawer,
		LightSwitch,
		drawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { Cookie, ExternalLink, Github, Info, Linkedin, XCircle } from 'lucide-svelte';
	import { gdprDrawerSettings, infoDrawerSettings } from '$lib/data/drawers';
	import Button from '$lib/components/common/button.svelte';
	import GdprPanel from '$lib/components/gdpr/gdpr-panel.svelte';
	import InfoPanel from '$lib/components/info/info-panel.svelte';
	import { consented } from '$lib/stores/gdpr-store';
	import { onMount } from 'svelte';

	inject({ mode: dev ? 'development' : 'production' });
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const openDrawer = (settings: DrawerSettings) => {
		drawerStore.open(settings);
	};

	const closeDrawer = () => {
		drawerStore.close();
	};

	onMount(() => {
		if (!consented()) {
			openDrawer(gdprDrawerSettings);
		}
	});
</script>

<Drawer>
	<div class="space-y-4">
		<div class="flex flex-row justify-end">
			<Button on:click={closeDrawer}><XCircle class="icon-sm" /></Button>
		</div>
		{#if $drawerStore.id === gdprDrawerSettings.id}
			<GdprPanel />
		{:else if $drawerStore.id === infoDrawerSettings.id}
			<InfoPanel />
		{/if}
	</div>
</Drawer>
<AppShell>
	<svelte:fragment slot="header">
		<div
			class="w-full bg-secondary-300 dark:bg-secondary-500 text-on-tertiary-token dark:text-on-secondary-token"
		>
			<div class="page-container flex flex-row justify-center gap-4 p-2">
				<a
					href="https://github.com/brecht-vde/timetabler"
					target="_blank"
					class="btn btn-icon btn-icon-sm link-socials"
				>
					<Github class="icon-sm" />
				</a>
				<a
					href="https://www.linkedin.com/in/brechtvanderelst"
					target="_blank"
					class="btn btn-icon btn-icon-sm link-socials"
				>
					<Linkedin class="icon-sm" />
				</a>
				<a
					href="https://www.vanderelst.dev"
					target="_blank"
					class="btn btn-icon btn-icon-sm link-socials"
				>
					<ExternalLink class="icon-sm" />
				</a>
			</div>
		</div>
		<div class="page-container flex flex-row justify-between p-4">
			<h1 class="h2">Timetabler</h1>
			<div class="flex gap-4 items-center">
				<Button
					on:click={() => openDrawer(infoDrawerSettings)}
					class="btn btn-icon btn-icon-sm link-functions"
				>
					<Info class="icon-sm" />
				</Button>
				<Button
					on:click={() => openDrawer(gdprDrawerSettings)}
					class="btn btn-icon btn-icon-sm link-functions"
				>
					<Cookie class="icon-sm" />
				</Button>
				<LightSwitch />
			</div>
		</div>
	</svelte:fragment>
	<div class="page-container p-4">
		<slot />
	</div>
</AppShell>
