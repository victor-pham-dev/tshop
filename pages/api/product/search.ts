import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@prisma/client'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { PagingResponseProps, ResponseProps } from '@/network/services/api-handler'
import searchProduct from '@/Server/Modules/Product/search'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseProps<PagingResponseProps<Product> | null>>
) {
	let response: any
	if (req.method === METHOD.GET) {
		response = await searchProduct(req)
	}

	if (response) {
		return res.status(response.code).json({ code: response.code, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
}
