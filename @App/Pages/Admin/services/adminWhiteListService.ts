import { BaseService } from '@/@App/Core/service/BaseService'
import { ADMIN_WHITELIST_ENDPOINT } from '../configs/api'

class AdminWhiteList extends BaseService {}

export const adminWhiteListService = new AdminWhiteList(ADMIN_WHITELIST_ENDPOINT.endpoint)
