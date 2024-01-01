import { CoreCard } from '@/@App/Core/components'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { Image } from 'antd'

export const ProductInfo = () => {
	const { warehouseItem } = useCorePageContext()
	console.log('🚀 ~ file: ProductInfo.tsx:5 ~ ProductInfo ~ warehouseItem:', warehouseItem)

	const firstImage = warehouseItem?.Product?.images ? JSON.parse(warehouseItem?.Product?.images)[0] : '/'
	return (
		<CoreCard className="flex flex-col gap-4">
			<p>Tên sản phẩm: </p>
			<p className="text-blue-500 font-600">{warehouseItem?.Product?.name}</p>
			<div className="relative w-40">
				<Image alt="product" src={firstImage} />
			</div>
		</CoreCard>
	)
}
