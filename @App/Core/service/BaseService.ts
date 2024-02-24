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
	// BASE_URL = 'https://itxgear-gw.io.vn'
	BASE_ENDPOINT: string | undefined = ''
	constructor(endpoint?: string) {
		this.BASE_ENDPOINT = endpoint
	}

	getToken = () => {
		const token = sessionStorage.getItem('beep')
		return token ?? ''
	}

	private checkEndpointHaveBaseUrl = (str: string) => {
		if (str.startsWith('http')) {
			return str
		} else {
			return this.BASE_URL + str
		}
	}

	responseInterceptor = (result: any, status: number) => {
		if (status === 403 || status === 401) {
			//user not auth
			// window.location.assign('/404')
		}

		if (!result.success) {
			throw { message: result?.message ?? 'API error', code: result?.statusCode, data: result }
		}
		return result
	}

	request = {
		get: async (endpoint: string, headers?: any, config?: any) => {
			try {
				const response = await fetch(this.checkEndpointHaveBaseUrl(endpoint), {
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
				throw error
			}
		},

		post: async (endpoint: string, data: any, config?: any, isUploadFile = false) => {
			const contentTypeHeaders =
				typeof data === 'object' && !isUploadFile ? { 'Content-type': 'application/json' } : {}
			const body = typeof data === 'object' && !isUploadFile ? JSON.stringify(data) : data
			try {
				const response = await fetch(this.checkEndpointHaveBaseUrl(endpoint), {
					method: METHOD.POST,
					headers: {
						'x-access-token': this.getToken(),
						...contentTypeHeaders,
						...config
					},
					body
				})
				const result = await response.json()
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw error
			}
		},

		put: async (endpoint: string, data: any, config?: any) => {
			const contentTypeHeaders = typeof data === 'object' ? { 'Content-type': 'application/json' } : {}
			const body = typeof data === 'object' ? JSON.stringify(data) : data
			try {
				const response = await fetch(this.checkEndpointHaveBaseUrl(endpoint), {
					method: METHOD.PUT,
					headers: {
						'x-access-token': this.getToken(),
						...contentTypeHeaders,
						...config
					},
					body
				})
				const result = await response.json()
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw error
			}
		},

		patch: async (endpoint: string, data: any, config?: any, isUploadFile = false) => {
			const contentTypeHeaders =
				typeof data === 'object' && !isUploadFile ? { 'Content-type': 'application/json' } : {}
			const body = typeof data === 'object' && !isUploadFile ? JSON.stringify(data) : data
			try {
				const response = await fetch(this.checkEndpointHaveBaseUrl(endpoint), {
					method: METHOD.PATCH,
					headers: {
						'x-access-token': this.getToken(),
						...contentTypeHeaders,
						...config
					},
					body
				})
				const result = await response.json()
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw error
			}
		},

		delete: async (endpoint: string, config?: any) => {
			try {
				const response = await fetch(this.checkEndpointHaveBaseUrl(endpoint), {
					method: METHOD.DELETE,
					headers: {
						'x-access-token': this.getToken(),
						...config
					}
				})
				const result = await response.json()
				return this.responseInterceptor(result, response?.status)
			} catch (error: any) {
				throw error
			}
		}
	}

	search = async ({ params, header }: searchProps) => {
		const convertParams = queryString.stringify(params ?? { page: 1, pageSize: 10 })
		const endpoint = `${this.checkEndpointHaveBaseUrl(this.BASE_ENDPOINT ?? '')}?${convertParams}`
		return this.request.get(endpoint, header)
	}

	find = async (id: string, config?: any) => {
		const endpoint = `${this.checkEndpointHaveBaseUrl(this.BASE_ENDPOINT ?? '')}/${id}`
		return this.request.get(endpoint, {}, config)
	}

	remove = async (id: string, config?: any) => {
		const endpoint = `${this.checkEndpointHaveBaseUrl(this.BASE_ENDPOINT ?? '')}/${id}`
		return this.request.delete(endpoint, config)
	}

	save = async (data: any, config?: any) => {
		const endpoint = `${this.checkEndpointHaveBaseUrl(this.BASE_ENDPOINT ?? '')}`
		if (data?.id) {
			return this.request.put(endpoint, data, config)
		}
		return this.request.post(endpoint, data, config)
	}

	updateSome = async (data: any, config?: any) => {
		const endpoint = `${this.checkEndpointHaveBaseUrl(this.BASE_ENDPOINT ?? '')}`
		return this.request.patch(endpoint, data, config)
	}
}
