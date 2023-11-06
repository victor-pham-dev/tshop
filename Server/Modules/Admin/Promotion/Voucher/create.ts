import { STATUS_CODE } from '@/const/app-const'
import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface DataProps {
	description: string
	dueAt: Date
	code: string
	usageCount: number
	activeAt: Date
	priceMin: number
	discount: number
}

export default async function create(req: NextApiRequest) {
	const data = JSON.parse(req.body) as DataProps
	try {
		const existed = await prisma.voucher.findFirst({
			where: {
				code: data?.code
			}
		})

		if (existed) {
			return {
				ok: false,
				data: null,
				msg: `Code ${data.code} đã tồn tại`,
				status: STATUS_CODE.OK
			}
		}

		const result = await prisma.voucher.create({
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
