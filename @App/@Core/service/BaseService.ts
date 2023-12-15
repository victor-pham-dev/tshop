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
	BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : ''
	BASE_ENDPOINT: string | undefined = ''
	constructor(endpoint?: string) {
		this.BASE_ENDPOINT = endpoint
	}

	getToken = () => {
		const token = sessionStorage.getItem('beep')
		return token ?? ''
	}

	responseInterceptor = (result: any, status: number) => {
		if (status === 403 || status === 401) {
			//user not auth
			window.location.assign('/404')
		}

		if (!result.success) {
			throw { message: result?.message ?? 'API error', data: result }
		}
		return result
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
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw { message: error?.msg, status: error?.status }
			}
		},

		post: async (endpoint: string, data: any, config?: any, dataType = 'obj') => {
			const defaultHeaderType = dataType === 'obj' ? { 'Content-type': 'application/json' } : {}
			try {
				const response = await fetch(endpoint, {
					method: METHOD.POST,
					headers: {
						'x-access-token': this.getToken(),
						...config,
						...defaultHeaderType
					},
					body: dataType === 'obj' ? JSON.stringify(data) : data
				})
				const result = await response.json()
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw { message: error?.msg, status: error?.status }
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
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw { message: error?.msg, status: error?.status }
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
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw { message: error?.msg, status: error?.status }
			}
		},

		delete: async (endpoint: string, config?: any) => {
			try {
				const response = await fetch(endpoint, {
					method: METHOD.DELETE,
					headers: {
						'x-access-token': this.getToken(),
						...config
					}
				})
				const result = await response.json()
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw { message: error?.msg, status: error?.status }
			}
		}
	}

	search = async ({ params, header }: searchProps) => {
		const convertParams = queryString.stringify(params ?? { page: 1, pageSize: 10 })
		const endpoint = `${this.BASE_URL}/${this.BASE_ENDPOINT}?${convertParams}`
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
