import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'

export default async function deleteRoleUser(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const userRole = await prisma.userRole.delete({
			where: { id: Number(id) }
		})

		return {
			ok: true,
			data: userRole,
			msg: 'ok'
		}
	} catch (error) {
		console.log("🚀 ~ file: delete.ts:19 ~ deleteRoleUser ~ error:", error)
		return null
	}
}