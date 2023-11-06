import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'
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
	return <CoreProvider {...data}>{children}</CoreProvider>
}

export default WarehouseListProvider
