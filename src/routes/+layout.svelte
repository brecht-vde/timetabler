<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { ExternalLink, Github, Linkedin } from 'lucide-svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div
			class="w-full bg-secondary-300 dark:bg-secondary-500 text-on-tertiary-token dark:text-on-secondary-token"
		>
			<div class="page-container flex flex-row justify-center gap-4 p-2">
				<a href="https://github.com/brecht-vde/timetabler" target="_blank" class="link-socials">
					<Github class="icon-sm" />
				</a>
				<a href="https://www.linkedin.com/in/brechtvanderelst" target="_blank" class="link-socials">
					<Linkedin class="icon-sm" />
				</a>
				<a href="https://www.vanderelst.dev" target="_blank" class="link-socials">
					<ExternalLink class="icon-sm" />
				</a>
			</div>
		</div>
		<div class="page-container flex flex-row justify-between p-4">
			<h1 class="h2">Timetabler</h1>
			<LightSwitch />
		</div>
	</svelte:fragment>
	<div class="page-container p-4">
		<slot />
	</div>
</AppShell>
