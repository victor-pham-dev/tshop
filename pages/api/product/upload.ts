import { METHOD, STATUS_CODE } from '@/const/app-const'
import s3 from '@/services/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== METHOD.POST) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({
			code: STATUS_CODE.INVALID_METHOD,
			data: null,
			msg: 'Invalid method'
		})
	}

	try {
		var params = {}
		s3.listBuckets((err, data) => {
			console.log('🚀 ~ file: upload.ts:17 ~ handler ~ data:', data)
			// return console.log(data)
		})
		// console.log('🚀 ~ file: upload.ts:17 ~ handler ~ a:', a)

		const file = req.body
		var uploadParams = {
			Bucket: 'product',
			Key: 'truong',
			Body: file,
			ACL: 'public-read',
			ContentType: file.type
		}
		var uploadOptions = {
			partSize: 10 * 1024 * 1024,
			queueSize: 1
		}
		var upload = s3.upload(uploadParams, uploadOptions)
		upload.send((err, data) => {
			if (err) {
				console.error('Upload lỗi:', err)
			} else if (data) {
				console.log('Upload thành công:', data)
			}
		})
		// const fileParams = {
		// 	Bucket: 'product',
		// 	Key: name,
		// 	Expires: 600,
		// 	ContentType: type,
		// 	ACL: 'public-read'
		// }

		// const url = await s3.getSignedUrlPromise('putObject', fileParams)

		return res.status(STATUS_CODE.OK).json({
			code: STATUS_CODE.OK,
			data: '',
			msg: 'OK'
		})
	} catch (error) {
		console.log(error)
		return res.status(STATUS_CODE.INTERNAL).json({
			code: STATUS_CODE.INTERNAL,
			data: null,
			msg: 'Internal server error'
		})
	}
}
