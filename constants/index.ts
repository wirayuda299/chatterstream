import { Home, Search } from 'lucide-react';

export const sidebarLinks = [
	{
		label: 'home',
		path: '/',
		icon: Home,
	},
	{
		label: 'search',
		path: '/search',
		icon: Search,
	},
] as const;
