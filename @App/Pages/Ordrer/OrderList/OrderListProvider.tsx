import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'
import { useRouter } from 'next/router'

const OrderListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()

	// const { productList, loadingFetchProductList, fetchProductList } = useProductList()
	// console.log('🚀 ~ file: OrderListProvider.tsx:10 ~ productList:', productList)
	const data = {
		...restProps
	}
	return <CoreProvider {...data}>{children}</CoreProvider>
}

export default OrderListProvider
