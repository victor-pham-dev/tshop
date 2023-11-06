import CategoryListProvider from './BannerListProvider'
import Table from './components/Table'

const BannerList = () => {
	return (
		<CategoryListProvider>
			<Table />
		</CategoryListProvider>
	)
}

export default BannerList
