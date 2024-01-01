import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCategoryFormModal } from './hooks/useCategoryFormModal'
// import { useRoleModal } from './hooks/useCategoryDetailModal'

const CategoryListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	// const { handleOpenRoleModal, renderRoleModal, handleCloseRoleModal } = useRoleModal()
	const { handleCloseDetailModal, handleOpenDetailModal, renderDetailModal } = useCategoryFormModal()

	const data = {
		handleCloseDetailModal,
		handleOpenDetailModal,

		refreshTable,
		triggerRefresh,
		...restProps
	}
	return (
		<CorePageProvider {...data}>
			{children} {renderDetailModal()}
		</CorePageProvider>
	)
}

export default CategoryListProvider
