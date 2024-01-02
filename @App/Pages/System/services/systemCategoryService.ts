import { BaseService } from '@/@App/Core/service/BaseService'
import { SYSTEM_CATEGORY_API } from '../configs/api'

class Catergory extends BaseService {
	getDetailAndSubCategory = (id: number | string) => {
		const endpoint = `/api/v1/system/category/category-detail/${id}`
		return this.request.get(endpoint)
	}
}
export const systemCategoryService = new Catergory(SYSTEM_CATEGORY_API.endpoint)
