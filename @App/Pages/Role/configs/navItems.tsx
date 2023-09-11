import { NavItemProps } from '@/@App/Layout/AppNav/navList'
import { ROLE_ROUTER } from './router'
import { CodeSandboxOutlined, UnorderedListOutlined } from '@ant-design/icons'

export const roleNavItems: NavItemProps[] = [
	{
		role: 'admin',
		key: 'role',
		label: 'Quản lý quền',
		icon: <CodeSandboxOutlined />,
		children: [
			{
				role: 'admin',
				key: 'role-list',
				label: 'Quản lý quyền',
				route: ROLE_ROUTER.LIST,
				icon: <UnorderedListOutlined />
			}
		]
	}
]
