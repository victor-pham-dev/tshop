import { NextRequest, NextResponse } from 'next/server'
import { tokenUtils } from './ultis/BE/token'
import { STATUS_CODE } from './const/app-const'
import { NextApiResponse } from 'next'

export interface DecodeTokenProps {
	email: string
	roles: string[]
	id: number
}

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname as string
	console.log('🚀 ~ file: middleware.ts:14 ~ middleware ~ path:', path)
	const handleNotAuth = (url: string) => {
		if (!['/auth/logout', '/auth/login'].includes(path)) {
			return NextResponse.redirect(new URL(url, req.url))
		}
	}

	const handleAuth = (decodeToken: any) => {
		const requestHeaders = new Headers(req.headers)
		requestHeaders.set('user', JSON.stringify(decodeToken))
		return NextResponse.next({
			request: {
				headers: requestHeaders
			}
		})
	}

	const token = req.headers.get('x-access-token')
	console.log('🚀 ~ file: middleware.ts:29 ~ middleware ~ token:', token)

	const regex = /\/api\/v[123456789]\/([^/]+)\//
	const url = req.url
	const checkModule = url.match(regex)

	const skipModules = ['auth']
	const module = checkModule && !skipModules.includes(checkModule[1]) ? checkModule[1] : null
	console.log('🚀 ~ file: middleware.ts:40 ~ middleware ~ module:', module)

	try {
		const decodeToken = await tokenUtils.verify(token ?? '')
		console.log('🚀 ~ file: middleware.ts:43 ~ middleware ~ decodeToken:', decodeToken)

		if (!token || decodeToken?.id === -1) {
			return handleNotAuth('/auth/logout')
		} else {
			const { roles, id, email } = decodeToken

			if (module) {
				if (roles?.includes(module)) {
					console.log(' 🚀  🚀 pass middleware module')

					return handleAuth(decodeToken)
				} else {
					return handleNotAuth('/403')
				}
			} else {
				console.log(' 🚀 SKIP middleware MODULEs ')
				return handleAuth(decodeToken)
			}
		}
	} catch (error) {
		return handleNotAuth('/auth/logout')
	}
}

export const config = {
	matcher: ['/api/v1/auth/me', '/api/v1/product/:path*', '/api/v1/order/:path*']
}
