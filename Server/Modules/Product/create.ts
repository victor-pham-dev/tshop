import { NextApiRequest } from 'next'
import { Classification } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'

interface BodyProps {
	name: string
	status: string
	category: string
	images: string[]
	description: string
	classifications: Classification[]
}
export default async function createProduct(req: NextApiRequest) {
	console.log(req.body)
	const { name, category, status, images, description, classifications } = req.body as BodyProps
	try {
		const result = await prisma.product.create({
			data: {
				name,
				status,
				category,
				images: JSON.stringify(images),
				description,
				classifications: {
					create: classifications.map(item => item)
				}
			}
		})

		return {
			code: STATUS_CODE.CREATED,
			data: `${removeMark(result.name)}pid=${result.id}`,
			msg: 'Tạo sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: create.ts:43 ~ createProduct ~ error:', error)
		return null
	}
}
