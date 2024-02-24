import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import FormDetail from './components/Form'
import ProductDetailProvider from './OrderDetailProvider'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { useOrderDetail } from './hooks/useOrderDetail'

const ProductDetail = () => {
	const router = useRouter()
	const { id } = router.query
	const { loadingFetchOrder, orderForm } = useOrderDetail()

	return (
		<ProductDetailProvider orderForm={orderForm} id={id}>
			{loadingFetchOrder ? (
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
