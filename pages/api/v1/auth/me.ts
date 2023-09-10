import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import { prisma } from '@/services/prisma'
import { tokenUtils } from '@/ultis/BE/token'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps<any>>) {
	if (req.method !== METHOD.GET) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({
			code: STATUS_CODE.INVALID_METHOD,
			data: null,
			msg: 'Invalid method'
		})
	}

	const userToken = tokenUtils.getDecodeToken(req)
	console.log('🚀 ~ file: me.ts:17 ~ handler ~ userToken:', userToken)

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
				code: STATUS_CODE.OK,
				data: { ...user, roles },
				msg: 'ok'
			})
		} else {
			return res.status(STATUS_CODE.NO_DATA).json({
				code: STATUS_CODE.NO_DATA,
				data: null,
				msg: 'ok'
			})
		}
	} catch (error) {
		return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
	}
}
