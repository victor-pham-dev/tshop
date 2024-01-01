import { BaseService } from '@/@App/Core/service/BaseService'
import { API_AUTH } from '../configs/api'

class Auth extends BaseService {
	register = (data: any) => {
		const endpoint = this.BASE_URL + API_AUTH.register
		return this.request.post(endpoint, data)
	}

	login = (data: any) => {
		console.log(this.BASE_URL)
		const endpoint = this.BASE_URL + API_AUTH.login
		return this.request.post(endpoint, data)
	}

	me = () => {
		const endpoint = this.BASE_URL + API_AUTH.me
		return this.request.get(endpoint)
	}

	logout = () => {
		const endpoint = API_AUTH.logout
		return this.request.post(endpoint, {})
	}
}
export const authService = new Auth()
