import { STATUS_CODE } from '@/const/app-const'
import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface CategoryProps {
	alias: string
	description: string
	label: string
	icon: string
	parentId?: number
}

interface DataProps extends CategoryProps {
	children: CategoryProps[]
}
export default async function create(req: NextApiRequest) {
	const { children, ...data } = JSON.parse(req.body) as DataProps
	try {
		const result = await prisma.category.create({
			data
		})

		const addIdToChildren = children.map(item => ({ ...item, parentId: result.id }))

		await prisma.category.createMany({ data: addIdToChildren })

		return {
			ok: true,
			data: true,
			msg: 'Tạo danh mục mới thành công',
			status: STATUS_CODE.OK
		}
	} catch (error) {
		// console.log('🚀 ~ file: create.ts:35 ~ create ~ error:', error)
		return {
			ok: false,
			data: JSON.stringify(error),
			msg: 'Internal Server error',
			status: STATUS_CODE.INTERNAL
		}
	}
}
