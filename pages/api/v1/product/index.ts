import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import createProduct from '@/Server/Modules/Product/create'
import editProduct from '@/Server/Modules/Product/edit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.POST) {
		response = await createProduct(req)
	}

	if (req.method === METHOD.PUT) {
		response = await editProduct(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}
