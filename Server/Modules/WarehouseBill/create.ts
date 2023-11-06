import { message } from 'antd'
import { STATUS_CODE } from '@/const/app-const'
import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'
import { WarehouseLogReason } from '@prisma/client'

interface DataProps {
	warehouseItemId: number
	reason: WarehouseLogReason
	quantity: number
	price: number
	note: string
	platformOrderId?: string
}

export default async function create(req: NextApiRequest) {
	const data = JSON.parse(req.body) as DataProps
	try {
		const result = await prisma.wareHouseBill.create({
			data
		})

		await prisma.wareHouse.update({
			where: {
				id: result.warehouseItemId
			},
			data: {
				quantity: { increment: data.quantity }
			}
		})

		return {
			ok: true,
			data: result,
			msg: 'Tạo mới thành công',
			status: STATUS_CODE.CREATED
		}
	} catch (error: any) {
		return {
			ok: false,
			data: null,
			msg: error?.message,
			status: STATUS_CODE.INTERNAL
		}
	}
}
