import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

interface BodyProps {
	label: string
	alias: string
}
export default async function create(req: NextApiRequest) {
	const { label, alias } = JSON.parse(req.body) as BodyProps
	try {
		await prisma.role.create({
			data: {
				label,
				alias
			}
		})

		return {
			ok: true,
			data: true,
			msg: 'Tạo quyền thành công',
			status: STATUS_CODE.CREATED
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
