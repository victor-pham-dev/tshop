import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

export default async function searchUser(req: NextApiRequest) {
	const { label, page = 1, pageSize = 10 } = req.query
	const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''
	console.log("🚀 ~ file: search.ts:7 ~ searchUser ~ lowercaseLabel:", lowercaseLabel)


	try {
		const user = await prisma.user.findMany({
			where: {
				name: {
					contains: lowercaseLabel,
					mode: 'insensitive'
				}
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		return {
			ok: true,
			data: {
				dataTable: user
			},
			msg: 'OK'
		}
	} catch (error) {
		console.log('🚀 ~ file: search.ts:61 ~ createProduct ~ error:', error)
		return null
	}
}
