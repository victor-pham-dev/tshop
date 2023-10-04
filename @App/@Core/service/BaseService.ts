import { METHOD } from '@/const/app-const'
import queryString from 'query-string'
export interface searchProps {
	params?: any
	header?: any
}

interface findProps {
	headers: any
	config?: any
	id: string
}

export class BaseService {
	BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
	BASE_ENDPOINT: string | undefined = ''
	constructor(endpoint?: string) {
		this.BASE_ENDPOINT = endpoint
	}

	getToken = () => {
		const token = sessionStorage.getItem('beep')
		return token ?? ''
	}

	request = {
		get: async (endpoint: string, headers?: any, config?: any) => {
			try {
				const response = await fetch(endpoint, {
					method: METHOD.GET,
					headers: {
						'x-access-token': this.getToken(),
						...headers
					},
					...config
				})
				const result = await response.json()
				if (!result.ok) {
					throw { message: 'API error', data: result }
				}
				return result
			} catch (error) {
				throw { message: 'Network error', error }
			}
		},

		post: async (endpoint: string, data: any, config?: any) => {
			try {
				const response = await fetch(endpoint, {
					method: METHOD.POST,
					headers: {
						'x-access-token': this.getToken(),
						...config
					},
					body: JSON.stringify(data)
				})
				const result = await response.json()
				if (!result.ok) {
					throw { message: 'API error', data: result }
				}
				return result
			} catch (error) {
				throw { message: 'Network error', error }
			}
		},

		put: async (endpoint: string, data: any, config?: any) => {
			try {
				const response = await fetch(endpoint, {
					method: METHOD.PUT,
					headers: {
						'x-access-token': this.getToken(),
						...config
					},
					body: JSON.stringify(data)
				})
				const result = await response.json()
				if (!result.ok) {
					throw { message: 'API error', data: result }
				}
				return result
			} catch (error) {
				throw { message: 'Network error', error }
			}
		},

		patch: async (endpoint: string, data: any, config?: any) => {
			try {
				const response = await fetch(endpoint, {
					method: METHOD.PATCH,
					headers: {
						'x-access-token': this.getToken(),
						...config
					},
					body: JSON.stringify(data)
				})
				const result = await response.json()
				if (!result.ok) {
					throw { message: 'API error', data: result }
				}
				return result
			} catch (error) {
				throw { message: 'Network error', error }
			}
		},

		delete: async (endpoint: string, config?: any) => {
			try {
				const response = await fetch(endpoint, {
					method: METHOD.DELETE,
					headers: {
						'x-access-token': this.getToken(),
						...config
					},
				})
				const result = await response.json()
				if (!result.ok) {
					throw { message: 'API error', data: result }
				}
				return result
			} catch (error) {
				throw { message: 'Network error', error }
			}
		},
	}

	search = async ({ params, header }: searchProps) => {
		const convertParams = queryString.stringify(params ?? { page: 1, pageSize: 10 })
		const endpoint = `${this.BASE_URL}/${this.BASE_ENDPOINT}/search?${convertParams}`
		return this.request.get(endpoint, header)
	}

	find = async (id: string, config?: any) => {
		const endpoint = `${this.BASE_URL}/${this.BASE_ENDPOINT}/${id}`
		return this.request.get(endpoint, {}, config)
	}

	remove = async (id: string, config?: any) => {
		const endpoint = `${this.BASE_URL}/${this.BASE_ENDPOINT}/${id}`
		return this.request.delete(endpoint, config)
	}

	save = async (data: any, config?: any) => {
		const endpoint = `${this.BASE_URL}/${this.BASE_ENDPOINT}`
		if (data?.id) {
			return this.request.put(endpoint, data, config)
		}
		return this.request.post(endpoint, data, config)
	}

	update = async (data: any, config?: any) => {
		const endpoint = `${this.BASE_URL}/${this.BASE_ENDPOINT}`
		return this.request.patch(endpoint, data, config)
	}
}
