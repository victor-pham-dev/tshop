import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCategoryFormModal } from './hooks/useCategoryFormModal'
import { useDetailCategoryFilterModal } from '../CategoryFilter/pages/ListPage/hooks/useDetailCategoryFilterModal'
const CategoryListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	const { handleCloseAddCategoryModal, handleOpenAddCategoryModal, renderAddCategoryModal } = useCategoryFormModal()
	const { handleOpenDetailFilterModal, handleCloseDetailFilterModal, renderDetailFilterModal} = useDetailCategoryFilterModal()

	const data = {
		handleCloseAddCategoryModal,
		handleOpenAddCategoryModal,
		renderAddCategoryModal,
		handleOpenDetailFilterModal,
		refreshTable,
		triggerRefresh,
		...restProps
	}
	return (
			<CorePageProvider {...data}>
				{children}
				{renderDetailFilterModal()}
			</CorePageProvider>
		)
}

export default CategoryListProvider
