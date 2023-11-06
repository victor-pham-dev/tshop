import { message } from 'antd'
import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function search(req: NextApiRequest) {
	const { label, page = 1, pageSize = 10 } = req.query
	// const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

	try {
		const result = await prisma.wareHouse.findMany({
			// where: {
			// 	label: {
			// 		contains: lowercaseLabel,
			// 		mode: 'insensitive'
			// 	},
			// 	parentId: 0
			// },
			include: {
				Product: true,
				WareHouseBill: {
					select: {
						warehouseItemId: true,
						createdAt: true,
						id: true,
						note: true,
						Order: true,
						orderId: true,
						platformOrderId: true,
						quantity: true,
						reason: true,
						updatedAt: true,
						WarehouseItem: true
					},
					orderBy: {
						updatedAt: 'desc'
					},
					take: 1
				}
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		const totalCount = await prisma.wareHouse.count({
			// where: {
			// 	label: {
			// 		contains: lowercaseLabel,
			// 		mode: 'insensitive'
			// 	},
			// 	parentId: 0
			// }
		})

		return {
			ok: true,
			data: {
				dataTable: result,
				paging: {
					page: Number(page),
					pageSize: Number(pageSize)
				},
				totalCount
			},
			msg: 'OK',
			status: STATUS_CODE.OK
		}
	} catch (error: any) {
		console.log('🚀 ~ file: search.ts:55 ~ search ~ error:', error)
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: error?.message,
			status: STATUS_CODE.INTERNAL
		}
	}
}
