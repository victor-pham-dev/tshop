import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import { ResponseProps } from '@/network/services/api-handler'
import createRole from '@/Server/Modules/Admin/Role/create'
import editProduct from '@/Server/Modules/Admin/Role/edit'
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps<string | null>>) {
	let response: any
	if (req.method === METHOD.POST) {
		response = await createRole(req)
	}

	if (req.method === METHOD.PUT) {
		response = await editProduct(req)
	}

	if (response) {
		return res.status(response.code).json({ code: response.code, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ code: STATUS_CODE.INTERNAL, data: null, msg: 'internal' })
}
