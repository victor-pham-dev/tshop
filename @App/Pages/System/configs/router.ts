export const SYSTEM_ROUTER = {
	LIST: '/system/role',
	ROLE_USERS: '/system/role-users',
	CATEGORY: '/system/category',
	BANNER: '/system/banner',
	VOUCHER: '/system/voucher',
	CATEGORY_FILTER: '/system/category-filter',
	CATEGORY_FILTER_DETAIL: (id: string) => `/system/category-filter/${id}`
}
