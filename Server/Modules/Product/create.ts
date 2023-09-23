import { NextApiRequest } from 'next'
import { Classification, ProductConfigInfo } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'

interface BodyProps {
	name: string
	status: string
	category: string
	images: string[]
	overView: string[]
	description: string
	code: string
	seo: string
	keywords: string
	classifications: Classification[]
	configInfo: ProductConfigInfo[]
}
export default async function createProduct(req: NextApiRequest) {
	const { name, category, status, keywords, images, description, configInfo, seo, overView, classifications } =
		JSON.parse(req.body) as BodyProps
	console.log('🚀 ~ file: create.ts:23 ~ createProduct ~ configInfo:', configInfo)
	try {
		await prisma.product.create({
			data: {
				name,
				status,
				category,
				seo,
				keywords,
				images: JSON.stringify(images),
				description,
				overView: JSON.stringify(overView),
				classifications: {
					create: classifications.map(item => item)
				},
				configInfo: {
					create: configInfo.map(item => item)
				}
			}
		})

		return {
			ok: true,
			data: true,
			msg: 'Tạo sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: create.ts:43 ~ createProduct ~ error:', error)
		return null
	}
}
