import { BaseService } from '@/@App/Core/service/BaseService'
import { WAREHOUSE_API } from '../configs/api'

class Warehouse extends BaseService {}

export const warehouseService = new Warehouse(WAREHOUSE_API.endpoint)
