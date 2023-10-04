import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'

export default async function findOrder(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const order = await prisma.order.findUnique({
			where: { id: Number(id) },
			select: {
				status: true,
				note: true,
				items: {
					select: {
						quantity: true,
						Product: {
							select: {
								name: true,
								images: true,
							},
						},
						Classification: {
							select: {
								id: true,
								price: true,
							},
						},
					},
				},
			},
		});

		const customer = await prisma.orderCustomerInfo.findUnique({
			where: { id: Number(id) }
		})

		const payment = await prisma.orderPayment.findUnique({
			where: { id: Number(id) }
		})

		return {
			ok: true,
			data: {order, customer, payment},
			msg: 'ok'
		}
	} catch (error) {
		console.log("🚀 ~ file: find.ts:22 ~ findOrder ~ error:", error)
		return null
	}
}
