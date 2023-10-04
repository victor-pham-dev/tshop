import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface BodyProps {
	orderId: string
	status: string
}
export default async function canceledOrder(req: NextApiRequest) {
	const { orderId, status } = JSON.parse(req.body) as BodyProps
	try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });

    if (existingOrder?.status === "CANCELED") {
      return {
        ok: false,
        data: null,
        msg: `Đơn hàng  ${orderId} đã được hủy rồi`,
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
			msg: `Hủy đơn hàng thành công`
		}
	} catch (error) {
		console.log("🚀 ~ file: canceled.ts:50 ~ editOrder ~ error:", error)
		return null
	}
}