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
	console.log(product)
	if((id === 'new' || product !==null)){
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
	return (
		<div>
        <h1>404 Page</h1>
    </div>
	)

}

export default ProductDetail
