import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@prisma/client'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { PagingResponseProps, ResponseProps } from '@/network/services/api-handler'
import findProductPublic from '@/Server/Modules/Public/Product/find'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	let response: any
	if (req.method === METHOD.GET) {
		response = await findProductPublic(req)
	}

	if (response) {
		return res.status(response.code).json({ code: response.code, data: response.data, msg: response.msg })
	}
	return res
		.status(STATUS_CODE.INVALID_METHOD)
		.json({ code: STATUS_CODE.INVALID_METHOD, data: null, msg: 'invalid method' })
}
