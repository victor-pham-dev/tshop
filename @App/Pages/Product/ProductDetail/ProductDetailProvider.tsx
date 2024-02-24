import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'

const ProductDetailProvider: React.FC<any> = ({ children, ...restProps }) => {
	const data = {
		...restProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}

export default ProductDetailProvider
