import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function search(req: NextApiRequest) {
	const { warehouseItemId, page = 1, pageSize = 10 } = req.query
	// const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

	try {
		const result = await prisma.wareHouseBill.findMany({
			where: {
				warehouseItemId: Number(warehouseItemId)
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		const totalCount = await prisma.wareHouseBill.count({
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
	} catch (error) {
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: 'Internal server',
			status: STATUS_CODE.INTERNAL
		}
	}
}
