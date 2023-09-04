import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE, TOKEN_KEY } from '@/const/app-const'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ResponseProps } from '@/network/services/api-handler'
import { prisma } from '@/services/prisma'
import { tokenUtils } from '@/ultis/BE/token'

interface ResProps {
	accessToken: string
}

interface PayloadProps {
	email: string
	password: string
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps<ResProps | null>>) {
	if (req.method !== METHOD.POST) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({
			code: STATUS_CODE.INVALID_METHOD,
			data: null,
			msg: 'Invalid method'
		})
	}

	const { email, password } = req.body as PayloadProps

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email.toLowerCase()
			},
			include: {
				ROLES: {
					include: {
						role: true
					}
				}
			}
		})
		if (user === null) {
			return res.status(STATUS_CODE.FAILED).json({
				code: STATUS_CODE.FAILED,
				data: null,
				msg: 'Tài khoản hoặc mật khẩu không chính xác'
			})
		}

		const comparePassword = bcrypt.compare(password, user.password)
		if (!comparePassword) {
			return res.status(STATUS_CODE.FAILED).json({
				code: STATUS_CODE.FAILED,
				data: null,
				msg: 'Mật khẩu không chính xác'
			})
		}

		const mapRoles = user.ROLES.map(item => item.role.alias)

		const accessToken = await tokenUtils.sign({ email: email.toLowerCase(), roles: mapRoles, id: user.id })

		return res.status(STATUS_CODE.OK).json({
			code: STATUS_CODE.OK,
			data: { accessToken },
			msg: `Xin chào ${user.name}`
		})
	} catch (error) {
		return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'Lỗi hệ thống' })
	}
}
