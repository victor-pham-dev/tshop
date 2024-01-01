import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useRouter } from 'next/router'

const ProductListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()

	// const { productList, loadingFetchProductList, fetchProductList } = useProductList()
	// console.log('🚀 ~ file: ProductListProvider.tsx:10 ~ productList:', productList)
	const data = {
		...restProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}

export default ProductListProvider
