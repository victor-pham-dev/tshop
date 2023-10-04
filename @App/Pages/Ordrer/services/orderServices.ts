import { BaseService } from '@/@App/@Core/service/BaseService'
import { ORDER_API } from '../configs/api'

class Order extends BaseService {}
export const orderServices = new Order(ORDER_API.endpoint)
export const orderServicesStatus = new Order(ORDER_API.status)
