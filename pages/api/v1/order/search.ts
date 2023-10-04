import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import searchOrder from '@/Server/Modules/Order/search'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.GET) {
		response = await searchOrder(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}