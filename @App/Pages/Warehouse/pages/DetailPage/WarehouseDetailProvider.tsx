import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useRequest } from 'ahooks'
import { useRouter } from 'next/router'
import { warehouseService } from '../../services/warehouseService'
import { Spin } from 'antd'
import { useState } from 'react'

const WarehouseDetailProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()
	const id = router.query.id as string

	const { data: warehouseItem, loading: loadingWarehouseItem } = useRequest(() => warehouseService.find(id))
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	const data = {
		id,
		refreshTable,
		triggerRefresh,
		warehouseItem: warehouseItem?.data,
		...restProps
	}
	return (
		<CorePageProvider {...data}>
			{loadingWarehouseItem ? (
				<div className="w-full flex justify-center items-center min-h-[30vh]">
					<Spin />
				</div>
			) : (
				children
			)}
		</CorePageProvider>
	)
}

export default WarehouseDetailProvider
