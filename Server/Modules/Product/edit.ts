import { NextApiRequest, NextApiResponse } from 'next'
import { Classification } from '@prisma/client'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import { AuthToken } from '@/middleware/server/auth'
import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'

interface BodyProps {
	id: string
	name: string
	status: string
	category: string
	images: string[]
	description: string
	classifications: Classification[]
}
export default async function editProduct(req: NextApiRequest) {
	console.log(req.body)
	const { id, name, category, status, images, description, classifications } = req.body as BodyProps
	try {
		await prisma.product.update({
			where: { id: Number(id) },
			data: {
				name,
				status,
				category,
				images: JSON.stringify(images),
				description
			}
		})

		await Promise.all(
			classifications.map(async item => {
				const { name, price, warrantyTime } = item
				if (item?.id) {
					await prisma.classification.update({
						where: { id: item.id },
						data: { name, price, warrantyTime }
					})
					return
				} else {
					const a = await prisma.classification.create({
						data: { name, price, productId: Number(id), warrantyTime }
					})
					console.log(a)
					return
				}
			})
		)

		return {
			code: STATUS_CODE.OK,
			data: 'OK',
			msg: 'Chỉnh sửa sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: edit.ts:40 ~ createProduct ~ error:', error)
		return null
	}
}
