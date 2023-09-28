import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import createRoleUser from '@/Server/Modules/Admin/RoleUsers/create'
import deleteRoleUser from '@/Server/Modules/Admin/RoleUsers/delete'
// import editProduct from '@/Server/Modules/Admin/Role/edit'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.POST) {
		response = await createRoleUser(req)
	}

	// if (req.method === METHOD.PUT) {
	// 	response = await editProduct(req)
	// }

	if (req.method === METHOD.DELETE) {
		response = await deleteRoleUser(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json(response)
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'Internal server' })
}
