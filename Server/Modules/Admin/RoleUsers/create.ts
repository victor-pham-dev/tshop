import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

interface BodyProps {
	userId: number
	roleId: number
}
export default async function create(req: NextApiRequest) {
	const { userId, roleId } = JSON.parse(req.body) as BodyProps
	try {
		await prisma.userRole.create({
			data: {
				userId,
				roleId
			}
		})

		return {
			status: STATUS_CODE.CREATED,
			ok: true,
			data: true,
			msg: 'Tạo quyền thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: create.ts:27 ~ createRole ~ error:', error)
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: 'Internal server',
			status: STATUS_CODE.INTERNAL
		}
	}
}
