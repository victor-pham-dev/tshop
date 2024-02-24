import { useRequest } from 'ahooks'
import { orderServices } from '../../services/orderServices'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { Order } from '@prisma/client'

export const useOrderDetail = () => {
	const router = useRouter()
	const id = router.query.id as string
	const [orderForm, setOrderForm] = useState<any>(null)
	const [statusChange, setStatusChange] = useState('')
	const { loading: loadingFetchOrder, runAsync: fetchOrder } = useRequest(orderServices.find, { manual: true })

	useEffect(() => {
		const getOrder = async (id: string) => {
			const orderForm = await fetchOrder(id)
			setOrderForm(orderForm)
			if (!orderForm) {
				router.push('/404')
			}
		}
		if (id && id?.toString() !== 'new') {
			getOrder(id)
		}
	}, [id, statusChange])

	return { orderForm: orderForm?.data, loadingFetchOrder, setStatusChange }
}
