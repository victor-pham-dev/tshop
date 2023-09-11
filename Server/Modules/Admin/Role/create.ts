import { NextApiRequest } from 'next'
import { Classification } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'

interface BodyProps {
	label: string
	alias: string
}
export default async function createRole(req: NextApiRequest) {
	console.log(req.body)
	const { label, alias } = req.body as BodyProps
	try {
		const result = await prisma.role.create({
			data: {
				label, 
				alias
			}
		})

		return {
			code: STATUS_CODE.CREATED,
			data: `label: ${label}, alias: ${alias}`,
			msg: 'Tạo quyền thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: create.ts:43 ~ createProduct ~ error:', error)
		return null
	}
}
