import { ReactNode } from 'react'
import CategoryFilterProvider from '../CategoryFilterProvider'
import TableListCategoryFilter from './component/TableListCategoryFilter'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { SYSTEM_ROUTER } from '../../../configs/router'
const ListPageCategoryFilter = () => {
	const router = useRouter()
	return (
		<CategoryFilterProvider>
			<div className="flex items-center gap-2">
				<Button
					onClick={() => router.push(SYSTEM_ROUTER.CATEGORY_FILTER_DETAIL('new'))}
					type="primary"
					color="success"
					style={{ width: '20%', marginBottom: '10px' }}
				>
					Thêm mới
				</Button>
			</div>

			<TableListCategoryFilter />
		</CategoryFilterProvider>
	)
}
export default ListPageCategoryFilter
