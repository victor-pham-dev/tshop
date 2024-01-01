import { BaseService } from '@/@App/Core/service/BaseService'
import { SYSTEM_CATEGORY_API } from '../configs/api'

class Catergory extends BaseService {}
export const categoryService = new Catergory(SYSTEM_CATEGORY_API.endpoint)
