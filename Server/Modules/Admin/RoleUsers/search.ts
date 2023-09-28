import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function searchRoleUsers(req: NextApiRequest) {
	const { label, page = 1, pageSize = 10 } = req.query
	const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''

	try {
		const userRoles = await prisma.userRole.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						active: true,
					},
				},
				role: {
					select: {
						label: true,
					},
				},
			},
			orderBy: {
				userId: 'asc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		});

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
			msg: 'OK'
		}
	} catch (error) {
		console.log('🚀 ~ file: search.ts:61 ~ createProduct ~ error:', error)
		return null
	}
}
