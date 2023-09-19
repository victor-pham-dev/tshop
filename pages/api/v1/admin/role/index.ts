import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import createRole from '@/Server/Modules/Admin/Role/create'
import editProduct from '@/Server/Modules/Admin/Role/edit'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.POST) {
		response = await createRole(req)
	}

	if (req.method === METHOD.PUT) {
		response = await editProduct(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json(response)
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'Internal server' })
}
