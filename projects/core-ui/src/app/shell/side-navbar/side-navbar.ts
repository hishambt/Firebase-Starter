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
		icon: 'contacts',
	},
	{
		title: 'Test',
		icon: 'home',
		children: [
			{
				title: 'Home',
				url: '/home',
				icon: 'home',
			},
			{ title: 'Profile', url: '/profile', icon: 'heart' },
			{ title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
			{ title: 'Archived', url: '/folder/archived', icon: 'archive' },
		],
	},
];
