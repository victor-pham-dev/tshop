import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

interface BodyProps {
	id: number
	label: string
	alias: string
	isActive: number
}
export default async function edit(req: NextApiRequest) {
	const { id, label, alias, isActive } = JSON.parse(req.body) as BodyProps
	try {
		await prisma.role.update({
			where: { id: id },
			data: {
				label,
				alias,
				isActive
			}
		})
		return {
			ok: true,
			data: `label: ${label} alias: ${alias} isActive: ${isActive}`,
			msg: 'Chỉnh sửa quyền thành công',
			status: STATUS_CODE.OK
		}
	} catch (error) {
		console.log('🚀 ~ file: edit.ts:40 ~ createProduct ~ error:', error)
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: 'Internal server',
			status: STATUS_CODE.INTERNAL
		}
	}
}
