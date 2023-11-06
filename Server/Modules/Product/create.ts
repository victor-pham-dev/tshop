import { message } from 'antd'
import { NextApiRequest } from 'next'
import { ProductConfigInfo } from '@prisma/client'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

interface BodyProps {
	name: string
	status: string
	categoryId: number
	images: string[]
	overView: string[]
	description: string
	code: string
	seo: string
	keywords: string
	configInfo: ProductConfigInfo[]
	price: number
	salePrice: number
}
export default async function create(req: NextApiRequest) {
	const { name, categoryId, status, keywords, images, description, configInfo, seo, overView, price, salePrice } =
		JSON.parse(req.body) as BodyProps
	try {
		const result = await prisma.product.create({
			data: {
				name,
				status,
				categoryId,
				seo,
				keywords,
				images: JSON.stringify(images),
				description,
				overView: JSON.stringify(overView),
				price,
				salePrice,
				configInfo: {
					create: configInfo.map(item => item)
				}
			}
		})
		const warehouse = await prisma.wareHouse.create({
			data: { productId: result.id }
		})

		await prisma.product.update({
			where: { id: result.id },
			data: { wareHouseId: warehouse.id }
		})

		return {
			ok: true,
			data: result,
			msg: 'Tạo sản phẩm thành công',
			status: STATUS_CODE.CREATED
		}
	} catch (error: any) {
		console.log('🚀 ~ file: create.ts:49 ~ createProduct ~ error:', error)
		return {
			ok: false,
			data: null,
			msg: error?.message,
			status: STATUS_CODE.INTERNAL
		}
	}
}
