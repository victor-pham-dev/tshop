import { BaseService } from '@/@App/@Core/service/BaseService'
import { API_AUTH } from '../configs/api'

class Auth extends BaseService {
	register = (data: any) => {
		const endpoint = API_AUTH.register
		return this.request.post(endpoint, data)
	}

	login = (data: any) => {
		const endpoint = API_AUTH.login
		return this.request.post(endpoint, data)
	}

	me = () => {
		const endpoint = API_AUTH.me
		return this.request.get(endpoint)
	}
}
export const authService = new Auth()
