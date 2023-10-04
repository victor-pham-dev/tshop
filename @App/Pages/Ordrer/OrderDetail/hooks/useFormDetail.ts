import { useRouter } from 'next/router'
import { orderServicesStatus } from '../../services/orderServices'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { ORDER_ROUTER } from '../../configs/router'
import { useState } from 'react'

export const useFormDetail = () => {
	const [statusChange, setStatusChange] = useState('')
	const { loading: loadingSaveOrder, run: saveOrder } = useRequest(orderServicesStatus.update, {
		manual: true,
		onSuccess: data => {
			message.success('Cập nhật đơn hàng thành công')
			setStatusChange(data.data.status)
		},
		onError: error => {
			message.success('Cập nhật đơn hàng thất bại')
		}
	})

	return { loadingSaveOrder, saveOrder, statusChange }
}
