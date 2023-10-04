import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface BodyProps {
	orderId: string
	status: string
}
export default async function shippingOrder(req: NextApiRequest) {
	const { orderId, status } = JSON.parse(req.body) as BodyProps
	try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });

    if (existingOrder?.status === "SHIPPING") {
      return {
        ok: false,
        data: null,
        msg: `Đơn hàng  ${orderId} đã xác nhận giao rồi`,
      };
    }

    const listOrderItem = await prisma.orderItem.findMany({
      where: { orderId: Number(orderId) }
    })

    await Promise.all(
      listOrderItem.map(async item => {
        await prisma.classification.update({
          where: { id: item.classificationId },
          data: { quantity: {
            increment: item.quantity
          } }
        })
      })
    )
   
		const updateOrder = await prisma.order.update({
			where: { id: Number(orderId) },
			data: { status }
		})

		return {
			ok: true,
			data: updateOrder,
			msg: `Đơn hàng sang trạng thái giao thành công`
		}
	} catch (error) {
		console.log("🚀 ~ file: shipping.ts:50 ~ shippingOrder ~ error:", error)
		return null
	}
}