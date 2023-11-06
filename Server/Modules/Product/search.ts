import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

export default async function search(req: NextApiRequest) {
	const { name, page = 1, pageSize = 10 } = req.query
	const lowercaseName = name ? name.toString().toLowerCase() : ''

	try {
		const filteredProducts = await prisma.product.findMany({
			where: {
				name: {
					contains: lowercaseName,
					mode: 'insensitive'
				}
			},
			include: {
				WareHouse: true
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		const totalCount = await prisma.product.count({
			where: {
				name: {
					contains: lowercaseName,
					mode: 'insensitive'
				}
			}
		})

		return {
			ok: true,
			data: {
				dataTable: filteredProducts,
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
		console.log('🚀 ~ file: search.ts:61 ~ createProduct ~ error:', error)
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: 'Internal server',
			status: STATUS_CODE.INTERNAL
		}
	}
}
