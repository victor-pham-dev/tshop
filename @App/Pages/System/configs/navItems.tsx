import { NavItemProps } from '@/@App/Layout/AppNav/navList'
import { SYSTEM_ROUTER } from './router'
import {
	FilterOutlined,
	FilterTwoTone,
	MenuOutlined,
	PictureTwoTone,
	SettingTwoTone,
	TagsTwoTone
} from '@ant-design/icons'
import { FaFilter } from 'react-icons/fa6'
export const roleNavItems: NavItemProps[] = [
	{
		role: 'system',
		key: 'role',
		label: 'Quản lý Hệ thống',
		icon: <SettingTwoTone />,
		children: [
			{
				role: 'system',
				key: 'category',
				label: 'Quản lý danh mục',
				route: SYSTEM_ROUTER.CATEGORY,
				icon: <MenuOutlined className="text-blue-500" />
			},
			{
				role: 'system',
				key: 'banner',
				label: 'Quản lý Banner',
				route: SYSTEM_ROUTER.BANNER,
				icon: <PictureTwoTone />
			},
			{
				role: 'system',
				key: 'vocher',
				label: 'Quản lý Voucher',
				route: SYSTEM_ROUTER.VOUCHER,
				icon: <TagsTwoTone twoToneColor="red" />
			},
			{
				role: 'system',
				key: 'category-filter',
				label: 'Quản lý Bộ Lọc',
				route: SYSTEM_ROUTER.CATEGORY_FILTER,
				icon: <FilterTwoTone twoToneColor="blue" />
			}
		]
	}
]
