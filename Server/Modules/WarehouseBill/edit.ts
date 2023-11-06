import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'
import { WareHouseBill } from '@prisma/client'

export default async function edit(req: NextApiRequest) {
	const { id, ...data } = JSON.parse(req.body) as Partial<WareHouseBill>
	try {
		const result = await prisma.wareHouseBill.update({
			where: { id: id },
			data: { ...data, updatedAt: new Date() }
		})

		return {
			ok: true,
			data: result,
			msg: 'Cập nhật thành công',
			status: STATUS_CODE.OK
		}
	} catch (err) {
		return {
			ok: false,
			data: JSON.stringify(err),
			msg: 'Cập nhật thất bại',
			status: STATUS_CODE.INTERNAL
		}
	}
}
