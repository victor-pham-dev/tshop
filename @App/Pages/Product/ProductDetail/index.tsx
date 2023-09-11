import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import FormDetail from './component/Form'
import ProductDetailProvider from './ProductDetailProvider'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { useProductDetail } from './hooks/useProductDetail'

const ProductDetail = () => {
	const router = useRouter()
	const { id } = router.query
	const { loadingFetchProduct, product } = useProductDetail()

	return (
		<ProductDetailProvider product={product} id={id}>
			{loadingFetchProduct ? (
				<div className="flex items-center justify-center w-full h-[]">
					<Spin />
				</div>
			) : (
				<FormDetail />
			)}
		</ProductDetailProvider>
	)
}

export default ProductDetail
