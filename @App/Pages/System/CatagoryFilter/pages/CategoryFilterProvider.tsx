import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { ReactNode } from 'react'
import { useCategoryFilterModal } from '../hooks/useCategoryFilterModal'
interface CategoryFilterProps {
	children: ReactNode
}
const CategoryFilterProvider: React.FC<CategoryFilterProps> = props => {
	const { children, ...resProps } = props

	const data = {
		...resProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}
export default CategoryFilterProvider
