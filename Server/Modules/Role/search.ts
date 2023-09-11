import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function searchRole(req: NextApiRequest) {
	const { name, page = 1, pageSize = 10 } = req.query
	const lowercaseName = name ? name.toString().toLowerCase() : ''

	try {
		const filteredRoles = await prisma.role.findMany({
			where: {
				label: {
					contains: lowercaseName,
					mode: 'insensitive'
				},
				deleted: 0 // Thêm điều kiện deleted = 0 vào đây
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		const totalCount = await prisma.role.count({
			where: {
				label: {
					contains: lowercaseName,
					mode: 'insensitive'
				},
				deleted: 0 // Thêm điều kiện deleted = 0 vào đây
			}
		})

		return {
			code: STATUS_CODE.OK,
			data: {
				dataTable: filteredRoles,
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