import type { DrawerSettings } from '@skeletonlabs/skeleton';

const gdprDrawerSettings: DrawerSettings = {
	id: 'gdprDrawer',
	position: 'bottom',
	height: 'h-auto',
	width: 'w-auto',
	bgBackdrop: 'bg-none',
	bgDrawer: 'bg-surface-700 dark:bg-surface-200',
	rounded: 'rounded-md',
	padding: 'p-4',
	regionDrawer: 'mx-auto p-4 text-surface-50 dark:text-surface-900'
};

const infoDrawerSettings: DrawerSettings = {
	id: 'infoDrawer',
	position: 'left',
	width: 'w-96',
	bgBackdrop: 'bg-none',
	bgDrawer:
		'bg-gradient-to-t from-surface-100 to-surface-50 dark:from-surface-700 dark:to-surface-900',
	rounded: 'rounded-none',
	regionDrawer: 'p-4'
};

export { gdprDrawerSettings, infoDrawerSettings };
