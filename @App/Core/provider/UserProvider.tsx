import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { STORAGE_KEY } from '../../../const/app-const'
import { useRouter } from 'next/router'
import { AUTH_ROUTER } from '@/@App/Pages/Auth/configs/router'
import { authService } from '@/@App/Pages/Auth/services/authServices'

const UserContext = createContext<UserConextProps>({} as UserConextProps)

export const useUser = () => useContext(UserContext)

type Props = {
	children: ReactNode
}

interface TokenProps {
	token: string
	roles: string[]
}

interface UserType extends TokenProps {
	id?: number
	name?: string
	email?: string
}

const initUser: UserType = {
	id: undefined,
	name: undefined,
	roles: [],
	email: undefined,
	token: ''
}

export interface UserConextProps {
	user: UserType
	update: (values: UserType) => void
	reset: () => void
	login: (token: string) => void
}

const UserProvider: React.FC<Props> = ({ children }) => {
	const router = useRouter()
	const [user, setUser] = useState<UserType>(initUser)

	const update = (newValue: UserType) => {
		setUser(newValue)
	}

	const login = (token: string) => {
		sessionStorage.setItem(STORAGE_KEY.LOCAL_USER, token)
	}

	const reset = async () => {
		await authService.logout()
		setUser(initUser)
		sessionStorage.removeItem(STORAGE_KEY.LOCAL_USER)
		router.push(AUTH_ROUTER.LOGIN)
	}

	return <UserContext.Provider value={{ user, update, reset, login }}>{children}</UserContext.Provider>
}

export { UserContext }
export default React.memo(UserProvider)
