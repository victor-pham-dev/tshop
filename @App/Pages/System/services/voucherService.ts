import { BaseService } from '@/@App/Core/service/BaseService'
import { SYSTEM_VOUCHER_API } from '../configs/api'

class Voucher extends BaseService {}
export const voucherService = new Voucher(SYSTEM_VOUCHER_API.endpoint)
