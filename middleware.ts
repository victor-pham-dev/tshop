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
	const handleNotAuth = (url: string) => NextResponse.rewrite(new URL(url, req.url))

	const handleAuth = (decodeToken: any) => {
		const requestHeaders = new Headers(req.headers)
		requestHeaders.set('user', JSON.stringify(decodeToken))
		requestHeaders.set('a', '1')
		return NextResponse.next({
			request: {
				headers: requestHeaders
			}
		})
	}

	const token = req.headers.get('x-access-token')
	console.log('🚀 ~ file: middleware.ts:29 ~ middleware ~ token:', token)

	const regex = /\/api\/([^/]+)/
	const url = req.url
	const checkModule = url.match(regex)

	const skipModules = ['auth']
	const module = checkModule && !skipModules.includes(checkModule[1]) ? checkModule[1] : null

	try {
		const decodeToken = await tokenUtils.verify(token ?? '')

		if (!token) {
			return handleNotAuth('/auth/login')
		} else {
			const { roles, id, email } = decodeToken

			if (module) {
				if (roles?.includes(module)) {
					console.log(' 🚀  🚀 pass middleware module')

					return handleAuth(decodeToken)
				} else {
					NextResponse.redirect(new URL('/404', req.url))
				}
			} else {
				console.log(' 🚀 SKIP middleware MODULEs ')
				return handleAuth(decodeToken)
			}
		}
	} catch (error) {
		if (!['/auth/logout', '/auth/login'].includes(path)) {
			return NextResponse.redirect(new URL('/auth/logout', req.url))
		}
	}
}

export const config = {
	matcher: ['/api/v1/auth/me', '/api/v1/product/:path*', '/api/v1/order/:path*']
}
