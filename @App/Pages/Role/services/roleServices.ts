import { BaseService } from '@/@App/@Core/service/BaseService'
import { ROLE_API } from '../configs/api'

class Role extends BaseService {}
export const roleServices = new Role(ROLE_API.endpoint)
