import { NextApiRequest } from 'next'
import { Classification } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'
import { prisma } from '@/services/prisma'

interface BodyProps {
	id: number
	label: string
	alias: string
	isActive: number
}
export default async function editProduct(req: NextApiRequest) {
	console.log(req.body)
	const { id, label, alias, isActive } = req.body as BodyProps
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
			code: STATUS_CODE.OK,
			data: `label: ${label} alias: ${alias} isActive: ${isActive}`,
			msg: 'Chỉnh sửa quyền thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: edit.ts:40 ~ createProduct ~ error:', error)
		return null
	}
}
