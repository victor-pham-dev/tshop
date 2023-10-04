import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import deleteRoleUser from '@/Server/Modules/Admin/RoleUsers/delete'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.DELETE) {
		response = await deleteRoleUser(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}
