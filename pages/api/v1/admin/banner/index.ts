import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import create from '@/Server/Modules/Admin/Promotion/Banner/create'
import edit from '@/Server/Modules/Admin/Promotion/Banner/edit'
import search from '@/Server/Modules/Admin/Promotion/Banner/search'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const methods = [
		{
			method: METHOD.POST,
			handler: create
		},
		{
			method: METHOD.PUT,
			handler: edit
		},
		{
			method: METHOD.GET,
			handler: search
		}
	]

	const handler = methods.find(item => item.method === req.method)?.handler
	if (!handler) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({
			ok: false,
			data: null,
			msg: 'Invalid Method'
		})
	}
	const response = await handler(req)

	return res.status(response?.status).json(response)
}
