import { BaseService } from '@/@App/Core/service/BaseService'
import { ADMIN_USER_ENDPOINT } from '../configs/api'

interface ChangeActiveStatusDto {
	id: number
	active: boolean
}

class AdminUser extends BaseService {
	changeActiveStatus = (data: ChangeActiveStatusDto) => {
		const endpoint = '/api/v1/admin/user/active-status'
		return this.request.patch(endpoint, data)
	}
}

export const adminUserService = new AdminUser(ADMIN_USER_ENDPOINT.endpoint)
