export interface IMenuItem {
	title: string;
	icon: string;
	url: string;
}

export const appPages: Array<IMenuItem> = [
	{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
	{ title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
	{ title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
	{ title: 'Archived', url: '/folder/archived', icon: 'archive' },
	{ title: 'Trash', url: '/folder/trash', icon: 'trash' },
	{ title: 'Spam', url: '/folder/spam', icon: 'warning' },
];
