import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { ReactNode, useState } from 'react'
import { useCategoryFilterModal } from '../hooks/useCategoryFilterModal'
interface CategoryFilterProps {
	children: ReactNode
}
const CategoryFilterProvider: React.FC<CategoryFilterProps> = props => {
	const { children, ...resProps } = props
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	const data = {
		triggerRefresh,
		refreshTable,
		...resProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}
export default CategoryFilterProvider
