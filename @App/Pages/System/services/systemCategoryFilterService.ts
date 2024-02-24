import { BaseService } from '@/@App/Core/service/BaseService'
import { SYSTEM_CATEGORY_FILTER } from '../configs/api'

class CatergoryFilter extends BaseService {}
export const systemCategoryFilterService = new CatergoryFilter(SYSTEM_CATEGORY_FILTER.endpoint)
