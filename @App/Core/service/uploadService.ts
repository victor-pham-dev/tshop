import { BaseService } from './BaseService'

class UploadService extends BaseService {
	uploadProduct = (data: any) => {
		return this.request.post(`${this.BASE_URL}/api/v1/product-file`, data, {}, 'else')
	}
}

export const uploadService = new UploadService()
