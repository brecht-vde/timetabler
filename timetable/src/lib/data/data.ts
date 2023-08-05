import type { Availability, Day, Slot } from '$lib/logic/domain/types';

export const Slots: Slot[] = [
	{ id: 1, label: '09-10', group: 1 },
	{ id: 2, label: '10-11', group: 1 },
	{ id: 3, label: '11-12', group: 1 },
	{ id: 4, label: '13-14', group: 2 },
	{ id: 5, label: '14-15', group: 2 },
	{ id: 6, label: '15-16', group: 2 }
];

export const Days: Day[] = [
	{ id: 1, label: 'M' },
	{ id: 2, label: 'T' },
	{ id: 3, label: 'W' },
	{ id: 4, label: 'T' },
	{ id: 5, label: 'F' }
];

export const Availabilities: Availability[] = [
	{
		day: 1,
		slot: 1,
		available: true
	},
	{
		day: 1,
		slot: 2,
		available: true
	},
	{
		day: 1,
		slot: 3,
		available: true
	},
	{
		day: 1,
		slot: 4,
		available: true
	},
	{
		day: 1,
		slot: 5,
		available: true
	},
	{
		day: 1,
		slot: 6,
		available: true
	},
	{
		day: 2,
		slot: 1,
		available: true
	},
	{
		day: 2,
		slot: 2,
		available: true
	},
	{
		day: 2,
		slot: 3,
		available: true
	},
	{
		day: 2,
		slot: 4,
		available: true
	},
	{
		day: 2,
		slot: 5,
		available: true
	},
	{
		day: 2,
		slot: 6,
		available: true
	},
	{
		day: 3,
		slot: 1,
		available: true
	},
	{
		day: 3,
		slot: 2,
		available: true
	},
	{
		day: 3,
		slot: 3,
		available: true
	},
	{
		day: 3,
		slot: 4,
		available: false
	},
	{
		day: 3,
		slot: 5,
		available: false
	},
	{
		day: 3,
		slot: 6,
		available: false
	},
	{
		day: 4,
		slot: 1,
		available: true
	},
	{
		day: 4,
		slot: 2,
		available: true
	},
	{
		day: 4,
		slot: 3,
		available: true
	},
	{
		day: 4,
		slot: 4,
		available: true
	},
	{
		day: 4,
		slot: 5,
		available: true
	},
	{
		day: 4,
		slot: 6,
		available: true
	},
	{
		day: 5,
		slot: 1,
		available: true
	},
	{
		day: 5,
		slot: 2,
		available: true
	},
	{
		day: 5,
		slot: 3,
		available: true
	},
	{
		day: 5,
		slot: 4,
		available: true
	},
	{
		day: 5,
		slot: 5,
		available: true
	},
	{
		day: 5,
		slot: 6,
		available: true
	}
];
