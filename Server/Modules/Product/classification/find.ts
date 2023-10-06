import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

export default async function findClassification(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const Classification = await prisma.classification.findUnique({
			where: { id: Number(id) },
			select: {
				name: true,
				quantity: true,
				price: true,
				image: true,
				Product: {
					select: {
						name: true
					}
				}
			}
		})

		return {
			ok: true,
			data: Classification,
			msg: 'ok'
		}
	} catch (error) {
		console.log("🚀 ~ file: find.ts:23 ~ findClassification ~ error:", error)
		return null
	}
}
