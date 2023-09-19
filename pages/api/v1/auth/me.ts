import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import { prisma } from '@/services/prisma'
import { tokenUtils } from '@/ultis/BE/token'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method !== METHOD.GET) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({
			ok: false,
			data: null,
			msg: 'Invalid method'
		})
	}

	const userToken = tokenUtils.getDecodeToken(req)

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userToken.id
			},
			select: {
				id: true,
				name: true,
				email: true,
				ROLES: {
					include: {
						role: true
					}
				}
			}
		})
		if (user) {
			const rawRoles = await prisma.userRole.findMany({ where: { userId: user.id }, include: { role: true } })
			const roles = rawRoles.map(item => item.role.alias)
			return res.status(STATUS_CODE.OK).json({
				ok: true,
				data: { ...user, roles },
				msg: 'ok'
			})
		} else {
			return res.status(STATUS_CODE.NO_DATA).json({
				ok: false,
				data: null,
				msg: 'ok'
			})
		}
	} catch (error) {
		return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
	}
}
