export interface IMenuItem {
	text: string;
	icon: string;
	routerLink?: string;
	selected: boolean;
	expanded?: boolean;
	children?: IMenuItem[];
}

// export interface IMenuItem {
// 	text: string;
// 	icon: string;
// 	selected: boolean;
// 	routerLink: string;
// }

export const items: Array<IMenuItem> = [
	{
		text: 'Dashboard',
		icon: 'dashboard',
		selected: false,
		routerLink: '/home'
	},
	{
		text: 'Products',
		icon: 'inventory_2',
		selected: false,
		expanded: false,
		children: [
			{
				text: 'All products',
				icon: 'category',
				selected: false,
				routerLink: '/products'
			}
		]
	},
	{
		text: 'Orders',
		icon: 'inventory_2',
		selected: false,
		expanded: false,
		children: [
			{
				text: 'All orders',
				icon: 'category',
				selected: false,
				routerLink: '/orders'
			}
		]
	},
	{
		text: 'Customers',
		icon: 'people',
		selected: false,
		routerLink: '/customers'
	},
	{
		text: 'Supplier',
		icon: 'supervised_user_circle',
		selected: false,
		routerLink: '/supplier/manage'
	},
	{
		text: 'Control panel',
		icon: 'inventory_2',
		selected: false,
		expanded: false,
		children: [
			{
				text: 'White labeling',
				icon: 'category',
				selected: false,
				routerLink: '/control-panel/white-labeling'
			}
		]
	},
	{
		text: 'Expense',
		icon: 'inventory_2',
		selected: false,
		expanded: false,
		children: [
			{
				text: 'Category',
				icon: 'category',
				selected: false,
				routerLink: '/product/category'
			},
			{
				text: 'Manage Expense',
				icon: 'layers',
				selected: false,
				routerLink: '/product/sub-category'
			},
			{
				text: 'Statement',
				icon: 'all_inbox',
				selected: false,
				routerLink: '/product/manage'
			}
		]
	},
	{
		text: 'Purchases',
		icon: 'receipt',
		selected: false,
		expanded: false,
		children: [
			{
				text: 'New Purchases',
				icon: 'local_atm',
				selected: false,
				routerLink: '/purchases/new'
			},
			{
				text: 'Purchases History',
				icon: 'history',
				selected: false,
				routerLink: '/purchases/history'
			}
		]
	},
	{
		text: 'Sales',
		icon: 'calculate',
		selected: false,
		expanded: false,
		children: [
			{
				text: 'New Sales',
				icon: 'point_of_sale',
				selected: false,
				routerLink: '/sales/add'
			},
			{
				text: 'Sales History',
				icon: 'history',
				selected: false,
				routerLink: '/sales/history'
			}
		]
	},
	{
		text: 'Report',
		icon: 'analytics',
		selected: false,
		routerLink: '/reports'
	}
];
