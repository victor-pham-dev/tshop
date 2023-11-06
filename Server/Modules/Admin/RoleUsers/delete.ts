import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

export default async function remove(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const userRole = await prisma.userRole.delete({
			where: { id: Number(id) }
		})

		return {
			ok: true,
			data: userRole,
			msg: 'ok',
			status: STATUS_CODE.OK
		}
	} catch (error) {
		console.log('🚀 ~ file: delete.ts:19 ~ deleteRoleUser ~ error:', error)
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: 'Internal server',
			status: STATUS_CODE.INTERNAL
		}
	}
}
