import { BaseService } from '@/@App/@Core/service/BaseService'
import { PRODUCT_API } from '../configs/api'

class Product extends BaseService {
	detail = (data: any) => {
		const endpoint = PRODUCT_API.endpoint
		return this.save({ endpoint, data })
	}
}
export const productServices = new Product(PRODUCT_API.endpoint)
