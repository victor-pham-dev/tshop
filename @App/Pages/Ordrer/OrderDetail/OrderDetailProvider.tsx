import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'
import { useFormDetail } from './hooks/useFormDetail'

const OrderDetailProvider: React.FC<any> = ({ children, ...restProps }) => {
	const { statusChange, loadingSaveOrder, saveOrder } = useFormDetail()

	const data = {
		statusChange,
		loadingSaveOrder,
		saveOrder,
		...restProps
	}
	return <CoreProvider {...data}>{children}</CoreProvider>
}

export default OrderDetailProvider
