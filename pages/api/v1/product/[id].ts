import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import findProduct from '@/Server/Modules/Product/find'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.GET) {
		response = await findProduct(req)
	}

	if (response) {
		return res.status(response.code).json({ code: response.code, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
}
