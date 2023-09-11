export interface IMenuItem {
	title: string;
	icon: string;
	url?: string;
	open?: boolean;
	active?: boolean;
	children?: IMenuItem[];
}export const appPages: Array<IMenuItem> = [
	{
		title: 'Main',
		icon: 'trash',
		children: [{ title: 'Home', url: '/home', icon: 'home' }],
	},
	{
		title: 'Test',
		icon: 'home',
		children: [{ title: 'Profile', url: '/profile', icon: 'heart' }],
	},
	{ title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
	{ title: 'Archived', url: '/folder/archived', icon: 'archive' },
	{ title: 'Trash', url: '/folder/trash', icon: 'trash' },
	{ title: 'Spam', url: '/folder/spam', icon: 'warning' },
];
