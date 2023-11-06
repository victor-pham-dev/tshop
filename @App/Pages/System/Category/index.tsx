import CategoryListProvider from './CategoryListProvider'
import Table from './components/Table'

const CategoryList = () => {
	return (
		<CategoryListProvider>
			<Table />
		</CategoryListProvider>
	)
}

export default CategoryList
