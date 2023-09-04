import queryString from 'query-string'
interface searchProps {
	// endpoint: string
	options?: any
	config?: any
}

interface postProps {
	endpoint: string
	data: any
	config?: any
}

interface getProps {
	endpoint: string
	config?: any
}

export class BaseService {
	BASE_ENDPOINT: string | undefined = ''
	constructor(endpoint?: string) {
		this.BASE_ENDPOINT = endpoint
	}

	getToken = () => {
		const token = sessionStorage.getItem('beep')
		return token ?? ''
	}

	checkAuth = (res: any) => {
		console.log(res)
		return true
	}

	search = async ({ options, config }: searchProps) => {
		const params = queryString.stringify(options ?? { page: 1, pageSize: 10 })
		const rqEndpoint = `${this.BASE_ENDPOINT ?? ''}/search?${params}`
		const response = await fetch(rqEndpoint, {
			method: 'GET',
			headers: {
				'x-access-token': this.getToken(),
				...config
			}
		})
		const result = await response.json()
		return result
	}

	post = async ({ endpoint, data, config }: postProps) => {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'x-access-token': this.getToken(),
				'Content-Type': 'application/json',
				...config
			},
			body: JSON.stringify(data)
		})
		const result = await response.json()
		const authPass = this.checkAuth(result)
		if (authPass) return result
		return
	}

	get = async ({ endpoint, config }: getProps) => {
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'x-access-token': this.getToken(),
				...config
			}
		})
		const result = await response.json()
		return result
	}

	find = async (id: string, config?: any) => {
		const endpoint = `${this.BASE_ENDPOINT ?? ''}/${id}`
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'x-access-token': this.getToken(),
				...config
			}
		})
		const result = await response.json()
		return result
	}

	save = async ({ endpoint, data, config }: postProps) => {
		let response: Response
		if (!data?.id) {
			response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'x-access-token': this.getToken(),
					'Content-Type': 'application/json',
					...config
				},
				body: JSON.stringify(data)
			})
		} else {
			response = await fetch(endpoint, {
				method: 'PUT',
				headers: {
					'x-access-token': this.getToken(),
					'Content-Type': 'application/json',
					...config
				},
				body: JSON.stringify(data)
			})
		}

		const result = await response.json()

		return result
	}
}
