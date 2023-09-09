import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE, TOKEN_KEY } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import jwt from 'jsonwebtoken'
import { sendMail } from '@/services/nodemailer'
// import { templates } from "@/lib/mail-template/templates";

interface PayloadProps {
	email: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps<null>>) {
	if (req.method !== METHOD.POST) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({
			code: STATUS_CODE.INVALID_METHOD,
			data: null,
			msg: 'Invalid method'
		})
	}

	const { email } = req.body as PayloadProps

	try {
		const resetToken = jwt.sign({ email: email.toLowerCase() }, TOKEN_KEY, {
			expiresIn: '1d'
		})
		// const mailContent = templates.resetPassword(resetToken);
		// await sendMail({
		//   to: email,
		//   subject: "Đặt lại mật khẩu - ITX Gear",
		//   html: mailContent,
		// });
		return res.status(STATUS_CODE.OK).json({
			code: STATUS_CODE.OK,
			data: null,
			msg: 'OK'
		})
	} catch (error) {
		return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
	}
}
