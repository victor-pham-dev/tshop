import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'

export default async function find(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const [parent, children] = await Promise.all([
			prisma.category.findUnique({
				where: { id: Number(id) }
			}),
			prisma.category.findMany({
				where: {
					parentId: Number(id)
				}
			})
		])

		return {
			ok: true,
			data: { ...parent, children },
			msg: 'ok',
			status: STATUS_CODE.OK
		}
	} catch (err) {
		return {
			ok: false,
			data: JSON.stringify(err),
			msg: 'Lấy thông tin danh mục thất bại',
			status: STATUS_CODE.INTERNAL
		}
	}
}
