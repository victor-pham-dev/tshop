import { NavItemProps } from '@/@App/Layout/AppNav/navList'

import { CodeSandboxOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { ORDER_ROUTER } from './router'

export const orderNavItems: NavItemProps[] = [
	{
		role: 'order',
		key: 'order',
		label: 'Quản lý đơn hàng',
		icon: <CodeSandboxOutlined />,
		children: [
			{
				role: 'order',
				key: 'order-list',
				label: 'Danh sách đơn hàng',
				route: ORDER_ROUTER.LIST,
				icon: <UnorderedListOutlined />
			}
		]
	}
]
