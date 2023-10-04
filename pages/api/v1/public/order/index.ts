import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import createOrder from '@/Server/Modules/Public/Order/create'
import statusOrder from '@/Server/Modules/Order/status'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { canceledOrder } = statusOrder;
	let response: any
	if (req.method === METHOD.POST) {
		response = await createOrder(req)
	}

	if (req.method === METHOD.PATCH) {
		const status = req.body.status
		if (status === 'CANCELED') {
			response = await canceledOrder(req)
		}
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}
