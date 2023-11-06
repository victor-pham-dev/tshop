import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { STATUS_CODE } from '@/const/app-const'

interface CategoryProps {
	id: number
	alias: string
	description: string
	label: string
	icon: string
	parentId?: number
}

interface DataProps extends CategoryProps {
	children: CategoryProps[]
}

export default async function edit(req: NextApiRequest) {
	const { id, children, ...data } = JSON.parse(req.body) as DataProps
	try {
		await prisma.category.update({
			where: { id: id },
			data
		})

		const currentChildren = await prisma.category.findMany({
			where: { parentId: Number(id) }
		})
		const idsToRemove = currentChildren.filter(item => !children?.find(current => current.id === item.id))
		await Promise.all(
			idsToRemove.map(
				async id =>
					await prisma.category.delete({
						where: { id: Number(id) }
					})
			)
		)
		await Promise.all(
			children.map(async item => {
				const { id, ...data } = item
				if (id) {
					return await prisma.category.update({
						where: { id },
						data
					})
				} else {
					return await prisma.category.create({
						data
					})
				}
			})
		)

		return {
			ok: true,
			data: true,
			msg: 'Cập nhật danh mục thành công',
			status: STATUS_CODE.OK
		}
	} catch (err) {
		return {
			ok: false,
			data: JSON.stringify(err),
			msg: 'Cập nhật danh mục thất bại',
			status: STATUS_CODE.INTERNAL
		}
	}
}
