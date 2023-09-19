import { NextApiRequest } from 'next'
import { Classification } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'

interface BodyProps {
	label: string
	alias: string
}
export default async function createRole(req: NextApiRequest) {
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
			data: `label: ${label}, alias: ${alias}`,
			msg: 'Tạo quyền thành công'
		}
	} catch (error) {
		return null
	}
}
