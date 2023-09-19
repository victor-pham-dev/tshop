import { useRouter } from 'next/router'
import { productServices } from '../../services/productServices'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { PRODUCT_ROUTER } from '../../configs/router'

export const useFormDetail = (id: string) => {
	const router = useRouter()
	const { loading: loadingSaveProduct, run: saveProduct } = useRequest(productServices.save, {
		manual: true,
		onSuccess: data => {
			if (id === 'new') {
				message.success('Tạo sản phẩm thành công')
			} else {
				message.success('Cập nhật sản phẩm thành công')
			}
			router.push(PRODUCT_ROUTER.LIST)
		},
		onError: error => {
			if (id === 'new') {
				message.success('Tạo sản phẩm thất bại')
			} else {
				message.success('Cập nhật phẩm thất bại')
			}
		}
	})

	return { loadingSaveProduct, saveProduct }
}
