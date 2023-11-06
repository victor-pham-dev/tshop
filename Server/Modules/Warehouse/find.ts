import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'

export default async function find(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const result = await prisma.wareHouse.findUnique({
			where: {
				id: Number(id)
			},
			include: {
				Product: true
			}
		})

		return {
			ok: true,
			data: result,
			msg: 'ok',
			status: STATUS_CODE.OK
		}
	} catch (err) {
		return {
			ok: false,
			data: JSON.stringify(err),
			msg: 'Lấy thông thất bại',
			status: STATUS_CODE.INTERNAL
		}
	}
}
