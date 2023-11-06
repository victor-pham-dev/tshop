import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'

export default async function find(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const product = await prisma.product.findUnique({
			where: { id: Number(id) },
			include: {
				configInfo: true
			}
		})

		return {
			ok: true,
			data: product,
			msg: 'ok',
			status: STATUS_CODE.OK
		}
	} catch (error) {
		console.log('🚀 ~ file: find.ts:26 ~ createProduct ~ error:', error)
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: 'Internal server',
			status: STATUS_CODE.INTERNAL
		}
	}
}
