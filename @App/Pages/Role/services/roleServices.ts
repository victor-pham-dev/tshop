import { BaseService } from '@/@App/@Core/service/BaseService'
import { ROLE_API } from '../configs/api'

class Role extends BaseService {
	detail = (data: any) => {
		const endpoint = ROLE_API.endpoint
		return this.save({ endpoint, data })
	}
}
export const roleServices = new Role(ROLE_API.endpoint)
