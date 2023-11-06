import { STATUS_CODE } from '@/const/app-const'
import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'
import { Voucher } from '@prisma/client'

interface DataProps {
	active: boolean
	description: string
	img: string
	link: string
}

export default async function create(req: NextApiRequest) {
	const data = JSON.parse(req.body) as DataProps
	try {
		const result = await prisma.banner.create({
			data
		})

		return {
			ok: true,
			data: result,
			msg: 'Tạo Banner mới thành công',
			status: STATUS_CODE.OK
		}
	} catch (error) {
		// console.log('🚀 ~ file: create.ts:35 ~ create ~ error:', error)
		return {
			ok: false,
			data: null,
			msg: JSON.stringify(error),
			status: STATUS_CODE.INTERNAL
		}
	}
}
