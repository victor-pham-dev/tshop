import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import { AuthToken } from '@/middleware/server/auth'
import { prisma } from '@/services/prisma'
import { DecodeTokenProps } from '@/middleware'
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
		const mapRoles = user?.ROLES.map(item => item.role.alias) ?? []
		return res.status(STATUS_CODE.OK).json({
			code: STATUS_CODE.OK,
			data: { ...user, roles: mapRoles },
			msg: 'ok'
		})
	} catch (error) {
		return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
	}
}
