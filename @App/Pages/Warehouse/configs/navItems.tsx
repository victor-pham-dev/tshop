import { NavItemProps } from '@/@App/Layout/AppNav/navList'
import { WAREHOUSE_ROUTER } from './router'
import {
	CodeSandboxOutlined,
	HomeTwoTone,
	IdcardTwoTone,
	MenuOutlined,
	PictureTwoTone,
	ReconciliationTwoTone,
	SettingTwoTone,
	TagsTwoTone,
	UnorderedListOutlined
} from '@ant-design/icons'

export const warehouseNavItems: NavItemProps[] = [
	{
		role: 'warehouse',
		key: 'warehouse',
		label: 'Quản lý Kho hàng',
		icon: <HomeTwoTone twoToneColor="purple" />,
		children: [
			{
				role: 'warehouse',
				key: 'warehouse-list',
				label: 'Kho Sản Phẩm',
				route: WAREHOUSE_ROUTER.LIST,
				icon: <ReconciliationTwoTone twoToneColor="green" />
			}
		]
	}
]
