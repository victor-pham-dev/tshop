import { NavItemProps } from '@/@App/Layout/AppNav/navList'
import { ADMIN_ROUTER } from './router'

export const adminNavItems: NavItemProps[] = [
	{
		role: 'admin',
		key: 'admin-dashboard',
		label: 'Dashboard - Admin',
		route: ADMIN_ROUTER.DASHBOARD
	}
]
