import { NextApiRequest } from 'next'
import { ProductConfigInfo } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'
import { prisma } from '@/services/prisma'

interface BodyProps {
	id: string
	name: string
	status: string
	categoryId: number
	images: string[]
	description: string
	configInfo: ProductConfigInfo[]
	overView: string[]
	price: number
	active: boolean
	salePrice: number
}
export default async function edit(req: NextApiRequest) {
	const { id, name, categoryId, status, images, configInfo, overView, description, active, price, salePrice } =
		JSON.parse(req.body) as BodyProps
	try {
		await prisma.product.update({
			where: { id: Number(id) },
			data: {
				name,
				status,
				categoryId,
				images: JSON.stringify(images),
				overView: JSON.stringify(overView),
				description,
				active,
				price,
				salePrice
			}
		})

		const currentConfig = await prisma.productConfigInfo.findMany({
			where: { productId: Number(id) }
		})

		const configIdsToRemove = currentConfig.filter(item => !configInfo?.find(current => current.id === item.id))
		await Promise.all(
			configIdsToRemove.map(
				async id =>
					await prisma.productConfigInfo.delete({
						where: {
							id: Number(id)
						}
					})
			)
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
			msg: 'Chỉnh sửa sản phẩm thành công',
			status: STATUS_CODE.OK
		}
	} catch (error) {
		return {
			ok: false,
			data: null,
			msg: JSON.stringify(error),
			status: STATUS_CODE.INTERNAL
		}
	}
}
