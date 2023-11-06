import { BaseService } from '@/@App/@Core/service/BaseService'
import { VOUCHER_API } from '../configs/api'

class Voucher extends BaseService {}
export const voucherService = new Voucher(VOUCHER_API.endpoint)
