import { ReactNode, useMemo } from 'react'
import type { MenuProps } from 'antd'
import { adminNavItems } from '@/@App/Pages/Admin/configs/navItems'
import { useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { productNavItems } from '@/@App/Pages/Product/configs/navItems'
import { orderNavItems } from '@/@App/Pages/Ordrer/configs/navItems'
import { roleNavItems } from '@/@App/Pages/Role/configs/navItems'
export interface NavItemProps {
	role: string
	route?: string
	label: React.ReactNode
	key: React.Key
	icon?: React.ReactNode
	children?: {
		role: string
		route?: string
		label: React.ReactNode
		key: React.Key
		icon?: React.ReactNode
	}[]
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label
	} as MenuItem
}

const itemsList = [...adminNavItems, ...productNavItems, ...orderNavItems, ...roleNavItems]

export const navList = () => {
	const router = useRouter()
	const { roles } = useUser()

	const checkNavHasRoute = (label: ReactNode, route?: string) => {
		return route ? <div onClick={() => router.push(route ?? '')}>{label}</div> : label
	}
	const items: MenuItem[] = useMemo(
		() =>
			itemsList
				.filter(item => roles.includes(item.role))
				.map(navItem =>
					getItem(
						checkNavHasRoute(navItem.label, navItem.route),
						navItem.key,
						navItem.icon,
						navItem?.children &&
							navItem.children
								.filter(item => roles.includes(item.role))
								.map(childItem =>
									getItem(
										checkNavHasRoute(childItem.label, childItem.route),
										childItem.key,
										childItem.icon
									)
								)
					)
				),
		[roles, itemsList]
	)

	return { items }
}
