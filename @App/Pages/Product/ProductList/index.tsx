import ProductListProvider from './ProductListProvider'
import Table from './components/Table'

const ProductList = () => {
	return (
		<ProductListProvider>
			<Table />
		</ProductListProvider>
	)
}

export default ProductList
