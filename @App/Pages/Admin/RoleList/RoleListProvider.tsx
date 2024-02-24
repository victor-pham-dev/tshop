import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRoleModal } from './hooks/useRoleModal'

const RoleListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	const { handleOpenRoleModal, renderRoleModal, handleCloseRoleModal } = useRoleModal()

	const data = {
		handleOpenRoleModal,
		renderRoleModal,
		handleCloseRoleModal,
		refreshTable,
		triggerRefresh,
		...restProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}

export default RoleListProvider
