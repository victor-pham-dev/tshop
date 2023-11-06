import { NavItemProps } from '@/@App/Layout/AppNav/navList'
import { SYSTEM_ROUTER } from './router'
import {
	CodeSandboxOutlined,
	IdcardTwoTone,
	MenuOutlined,
	PictureTwoTone,
	SettingTwoTone,
	TagsTwoTone,
	UnorderedListOutlined
} from '@ant-design/icons'

export const roleNavItems: NavItemProps[] = [
	{
		role: 'admin',
		key: 'role',
		label: 'Quản lý Hệ thống',
		icon: <SettingTwoTone />,
		children: [
			{
				role: 'admin',
				key: 'role-list',
				label: 'Quản lý quyền',
				route: SYSTEM_ROUTER.LIST,
				icon: <IdcardTwoTone />
			},
			{
				role: 'admin',
				key: 'role-users',
				label: 'Quản lý quyền User',
				route: SYSTEM_ROUTER.ROLE_USERS,
				icon: <UnorderedListOutlined />
			},
			{
				role: 'admin',
				key: 'category',
				label: 'Quản lý danh mục',
				route: SYSTEM_ROUTER.CATEGORY,
				icon: <MenuOutlined className="text-blue-500" />
			},
			{
				role: 'admin',
				key: 'banner',
				label: 'Quản lý Banner',
				route: SYSTEM_ROUTER.BANNER,
				icon: <PictureTwoTone />
			},
			{
				role: 'admin',
				key: 'vocher',
				label: 'Quản lý Voucher',
				route: SYSTEM_ROUTER.VOUCHER,
				icon: <TagsTwoTone twoToneColor="red" />
			}
		]
	}
]
