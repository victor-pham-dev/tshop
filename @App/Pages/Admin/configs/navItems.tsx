import { NavItemProps } from '@/@App/Layout/AppNav/navList'
import { ADMIN_ROUTER } from './router'
import { FaUserFriends, FaUserLock } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'
import { GrDocumentLocked } from 'react-icons/gr'
export const adminNavItems: NavItemProps[] = [
	{
		role: 'admin',
		key: 'admin-dashboard',
		label: 'Admin',
		icon: <MdAdminPanelSettings className="!text-red-500 !text-[1.2rem]" />,
		children: [
			{
				role: 'admin',
				key: 'user-list',
				label: 'Quản lý User',
				route: ADMIN_ROUTER.USER,
				icon: <FaUserFriends className="!text-blue-500 !text-[1.2rem]" />
			},
			{
				role: 'admin',
				key: 'role-admin',
				label: 'Danh sách quyền',
				route: ADMIN_ROUTER.ROLE,
				icon: <FaUserLock className="!text-orange-500 !text-[1.2rem]" />
			},
			{
				role: 'admin',
				key: 'whitelist-admin',
				label: 'Danh sách Email whitelist',
				route: ADMIN_ROUTER.WHITELIST_EMAIL,
				icon: <GrDocumentLocked className="!text-green-500 !text-[1.2rem]" />
			}
		]
	}
]
