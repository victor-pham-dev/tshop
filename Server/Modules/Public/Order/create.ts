import { NextApiRequest } from 'next'
import { OrderItem, OrderCustomerInfo, OrderPayment, Order } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'


interface BodyProps {
	items: OrderItem[]
	customerInfo: OrderCustomerInfo
	paymentInfo: OrderPayment
}
export default async function createOrder(req: NextApiRequest) {
	const { items, customerInfo, paymentInfo} = req.body as BodyProps;
	console.log("🚀 ~ file: create.ts:16 ~ createOrder ~ items:", items)
	try {
		const checkStocking = await Promise.all(
			items.map(async item => {
				const product = await prisma.classification.findUnique({
					where: { id: item.classificationId },
				});
				if(product && product?.quantity >= item.quantity){
					return {product, status: true}
				}
				else return {product, status: false}
			})
		)

		const isAllStocking = checkStocking.every(item => item.status)

		if(isAllStocking) {
			const customer = await prisma.orderCustomerInfo.create({
				data: customerInfo
			})
			const payment = await prisma.orderPayment.create({
				data: paymentInfo
			})
			const order = await prisma.order.create({
				data: {
					status: "WAITING",
					items: {
						create: items.map(item => item)
					},
					orderCustomerInfoId:  customer.id,
					orderPaymentId: payment.id
				}
			})
			await Promise.all(
				items.map(async (item, index) => {
					await prisma.classification.update({
						where: { id: item.classificationId },
						data: {quantity: (checkStocking[index].product?.quantity ?? 0) - item.quantity}
					});
				})
			)
			return {
				ok: true,
				data: order,
				msg: "Tạo Đơn hàng thành công"
			}
		}

		const productFalse = checkStocking.find(item => !item.status);

		return {
			ok: false,
			data: false,
			msg: `Sản phẩm ${productFalse?.product?.name} không đủ số lượng`
		}

	} catch (error) {
		console.log('🚀 ~ file: create.ts:43 ~ createProduct ~ error:', error)
		return null
	}
}
