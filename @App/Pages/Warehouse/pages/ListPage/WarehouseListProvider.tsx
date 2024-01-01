import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useRouter } from 'next/router'
import { useState } from 'react'

const WarehouseListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	const data = {
		refreshTable,
		triggerRefresh,
		...restProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}

export default WarehouseListProvider
