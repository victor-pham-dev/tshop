import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function searchRole(req: NextApiRequest) {
	const { label, page = 1, pageSize = 10 } = req.query
	const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

	try {
		const filteredRoles = await prisma.role.findMany({
			where: {
				label: {
					contains: lowercaseLabel,
					mode: 'insensitive'
				},
				deleted: 0
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})
		console.log('🚀 ~ file: search.ts:21 ~ searchRole ~ filteredRoles:', filteredRoles)

		const totalCount = await prisma.role.count({
			where: {
				label: {
					contains: lowercaseLabel,
					mode: 'insensitive'
				},
				deleted: 0
			}
		})

		return {
			ok: true,
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
