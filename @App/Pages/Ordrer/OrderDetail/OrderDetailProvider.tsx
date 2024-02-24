import { CorePageProvider } from '@/@App/Core/provider/CorePageProvider'
import { useFormDetail } from './hooks/useFormDetail'

const OrderDetailProvider: React.FC<any> = ({ children, ...restProps }) => {
	const { statusChange, loadingSaveOrder, saveOrder } = useFormDetail()

	const data = {
		statusChange,
		loadingSaveOrder,
		saveOrder,
		...restProps
	}
	return <CorePageProvider {...data}>{children}</CorePageProvider>
}

export default OrderDetailProvider
