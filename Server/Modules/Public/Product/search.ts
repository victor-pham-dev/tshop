import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function searchProductPublic(req: NextApiRequest) {
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
			select: {
				category: true,
				id: true,
				name: true,
				status: true,
				images: true,
				classifications: false
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
			code: STATUS_CODE.OK,
			data: {
				dataTable: filteredProducts,
				paging: {
					page: Number(page),
					pageSize: Number(pageSize)
				},
				totalCount
			},
			msg: 'OK'
		}
	} catch (error) {
		console.log('🚀 ~ file: search.ts:61 ~ createProduct ~ error:', error)
		return null
	}
}
