import { BaseService } from '@/@App/@Core/service/BaseService'
import { ROLE_API, ROLE_USERS_API, USERS_API } from '../configs/api'

class Role extends BaseService {}
export const roleServices = new Role(ROLE_API.endpoint)
export const roleUserServices = new Role(ROLE_USERS_API.endpoint)
export const usersServices = new Role(USERS_API.endpoint)
