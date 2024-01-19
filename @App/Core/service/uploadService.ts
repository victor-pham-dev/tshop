import queryString from 'query-string'
import { BaseService } from './BaseService'

class UploadService extends BaseService {
	uploadImage = (data: any, bucket: string) => {
		return this.request.post(`${this.BASE_URL}/api/v1/file/image?b=${bucket}`, data, {})
	}

	deleteImage = (bucket: string, fileName: string) => {
		const query = queryString.stringify({ b: bucket, name: fileName })
		const endpoint = `/api/v1/file/image?${query}`
		return this.request.delete(endpoint)
	}
}

export const uploadService = new UploadService()