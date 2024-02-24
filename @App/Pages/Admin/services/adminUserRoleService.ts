import { BaseService } from '@/@App/Core/service/BaseService'
import { ADMIN_USER_ROLES_ENDPOINT } from '../configs/api'

class AdminUserRole extends BaseService {}

export const adminUserRoleService = new AdminUserRole(ADMIN_USER_ROLES_ENDPOINT.endpoint)
