import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import createProduct from '@/Server/Modules/Product/create'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps<string | null>>) {
	let response: any
	if (req.method === METHOD.POST) {
		response = await createProduct(req)
	}

	if (response) {
		return res.status(response.code).json({ code: response.code, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
}
