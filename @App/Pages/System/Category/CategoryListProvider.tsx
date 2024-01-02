import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCategoryFormModal } from './hooks/useCategoryFormModal'
// import { useRoleModal } from './hooks/useCategoryDetailModal'

const CategoryListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	const { handleCloseAddCategoryModal, handleOpenAddCategoryModal, renderAddCategoryModal } = useCategoryFormModal()

	const data = {
		handleCloseAddCategoryModal,
		handleOpenAddCategoryModal,
		renderAddCategoryModal,
		refreshTable,
		triggerRefresh,
		...restProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}

export default CategoryListProvider
