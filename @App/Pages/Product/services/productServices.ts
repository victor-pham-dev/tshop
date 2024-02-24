import { BaseService } from '@/@App/Core/service/BaseService'
import { PRODUCT_API } from '../configs/api'

class Product extends BaseService {}
export const productServices = new Product(PRODUCT_API.endpoint)
