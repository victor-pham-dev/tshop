import { NextApiRequest } from 'next'
import { Classification, ProductConfigInfo } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'
import { prisma } from '@/services/prisma'

interface BodyProps {
	id: string
	name: string
	status: string
	category: string
	images: string[]
	description: string
	classifications: Classification[]
	configInfo: ProductConfigInfo[]
	overView: string[]
}
export default async function editProduct(req: NextApiRequest) {
	const { id, name, category, status, images, configInfo, overView, description, classifications } =
		req.body as BodyProps
	try {
		await prisma.product.update({
			where: { id: Number(id) },
			data: {
				name,
				status,
				category,
				images: JSON.stringify(images),
				overView: JSON.stringify(overView),
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
					await prisma.classification.create({
						data: { name, price, productId: Number(id), warrantyTime }
					})
					return
				}
			})
		)

		await Promise.all(
			configInfo.map(async item => {
				const { label, value } = item
				if (item?.id) {
					await prisma.productConfigInfo.update({
						where: { id: item.id },
						data: { label, value }
					})
					return
				} else {
					await prisma.productConfigInfo.create({
						data: { label, value, productId: Number(id) }
					})
					return
				}
			})
		)

		return {
			ok: true,
			data: 'OK',
			msg: 'Chỉnh sửa sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: edit.ts:40 ~ createProduct ~ error:', error)
		return null
	}
}
