'use client'
import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { PATH, STATUS_CODE, STORAGE_KEY } from '../../../const/app-const'
import { AuthenApi } from '../../../pages/api/user.api'
import { useRouter } from 'next/router'
import { checkRes } from '@/network/services/api-handler'
import { GetMyCartApi } from '@/pages/api/cart.api'
// import { useCart, useUser } from "@/hooks/useAppContext";
import { message } from 'antd'
import { useUser } from '@/hooks'
import { AUTH_ROUTER } from '@/@App/Pages/Auth/configs/router'
import { authService } from '@/@App/Pages/Auth/services/authServices'
import { useRequest } from 'ahooks'
import { FullPageLoading } from '@/components/loading/FullPageLoading'
interface Props {
	children: ReactNode
}

export const useUserInfo = () => {
	const router = useRouter()
	const currentPath = router.pathname
	const { update, reset } = useUser()
	const { loading: authLoading, run: fetchAuth } = useRequest(authService.me, {
		manual: true,
		onSuccess: res => {
			if (res?.code === STATUS_CODE.OK) {
				update(res?.data)
				if (currentPath === '/auth/login') {
					if (res?.data?.roles?.includes('admin')) {
						return router.push('/admin/dashboard')
					}
					return router.push('/dashboard')
				}
			} else {
				router.push(AUTH_ROUTER.LOGIN)
				reset()
				sessionStorage.clear()
			}
		},
		onError: () => router.push(AUTH_ROUTER.LOGIN)
	})
	return { authLoading, fetchAuth }
}

const AuthProvider: React.FC<Props> = ({ children }) => {
	const router = useRouter()

	const { token } = useUser()
	const { authLoading, fetchAuth } = useUserInfo()

	useEffect(() => {
		const localToken = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY.LOCAL_USER) : null
		if (token === '' && localToken) {
			fetchAuth()
		} else {
			router.push(AUTH_ROUTER.LOGIN)
		}
	}, [token])

	return <>{authLoading ? <FullPageLoading /> : children}</>
}

export default React.memo(AuthProvider)