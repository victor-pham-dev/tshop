import { Button } from 'antd'
import ProductListProvider from './ProductListProvider'
import Table from './components/Table'
import { useRouter } from 'next/router'
import { PRODUCT_ROUTER } from '../configs/router'

const ProductList = () => {
	const router = useRouter()
	return (
		<ProductListProvider>
			<div className="flex justify-between my-4">
				<Button type="primary" onClick={() => router.push(PRODUCT_ROUTER.NEW)}>
					Tạo mới
				</Button>
			</div>

			<Table />
		</ProductListProvider>
	)
}

export default ProductList
