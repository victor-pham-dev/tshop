import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

interface DataProps {
	id: number
	active: boolean
	description: string
	img: string
	link: string
}

export default async function edit(req: NextApiRequest) {
	const { id, ...data } = JSON.parse(req.body) as DataProps
	try {
		const result = await prisma.banner.update({
			where: { id: id },
			data
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
