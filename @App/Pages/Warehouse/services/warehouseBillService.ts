import { BaseService } from '@/@App/@Core/service/BaseService'
import { WAREHOUSE_BILL_API } from '../configs/api'

class WarehouseBill extends BaseService {}

export const warehouseBillService = new WarehouseBill(WAREHOUSE_BILL_API.endpoint)
