import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'
export default async function search(req: NextApiRequest) {
	const { label, page = 1, pageSize = 10 } = req.query
	const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

	try {
		const userRoles = await prisma.userRole.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						active: true
					}
				},
				role: {
					select: {
						label: true
					}
				}
			},
			orderBy: {
				userId: 'asc'
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		const totalCount = await prisma.userRole.count({})

		return {
			ok: true,
			data: {
				dataTable: userRoles,
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
