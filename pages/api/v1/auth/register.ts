import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'

import { ResponseProps } from '@/network/services/api-handler'
import { prisma } from '@/services/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method !== METHOD.POST) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({
			ok: false,
			data: null,
			msg: 'Phương thức không hỗ trợ'
		})
	}

	const { name, email, password } = JSON.parse(req.body) as any
	console.log('🚀 ~ file: register.ts:18 ~ handler ~ req.body:', typeof req.body)
	const findExisted = await prisma.user.findFirst({
		where: {
			email
		}
	})
	if (findExisted !== null) {
		return res.status(STATUS_CODE.OK).json({
			ok: false,
			data: null,
			msg: 'Email đã được sử dụng'
		})
	}

	try {
		const encryptedPassword = await bcrypt.hash(password, 10)
		console.log('🚀 ~ file: register.ts:36 ~ encryptedPassword:', encryptedPassword)
		await prisma.user.create({
			data: {
				name,
				email: email.toLowerCase(),
				password: encryptedPassword
			}
		})

		return res.status(STATUS_CODE.CREATED).json({
			code: STATUS_CODE.CREATED,
			data: null,
			msg: 'Đăng ký thành công'
		})
	} catch (error) {
		console.log('🚀 ~ file: register.ts:67 ~ error:', error)
		return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
	}
}
