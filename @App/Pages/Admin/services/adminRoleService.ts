import { BaseService } from '@/@App/Core/service/BaseService'
import { ADMIN_ROLE_ENDPOINT } from '../configs/api'

class AdminRole extends BaseService {}

export const adminRoleService = new AdminRole(ADMIN_ROLE_ENDPOINT.endpoint)
