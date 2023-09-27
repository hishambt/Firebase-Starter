export interface IMenuItem {
	title: string;
	icon: string;
	url?: string;
	open?: boolean;
	active?: boolean;
	children?: IMenuItem[];
}
export const appPages: Array<IMenuItem> = [
	{
		title: 'Home',
		url: '/home',
		icon: 'home',
	},
	{
		title: 'Contacts',
		url: '/contacts',
		icon: 'people',
	},
	{
		title: 'Settings',
		icon: 'settings',
		children: [
			{
				title: 'Profile',
				url: '/profile',
				icon: 'person',
			},
			{
				title: 'Favorites',
				url: '/test/favorites',
				icon: 'star',
			},
			{
				title: 'Archived',
				url: '/test/archived',
				icon: 'archive',
			},
		],
	},
];
