import { BaseService } from '@/@App/@Core/service/BaseService'
import { CATEGORY_API } from '../configs/api'

class Catergory extends BaseService {}
export const categoryService = new Catergory(CATEGORY_API.endpoint)
