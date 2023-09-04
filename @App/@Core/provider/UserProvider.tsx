import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { STORAGE_KEY } from '../../../const/app-const'
import { useRouter } from 'next/router'
import { User } from '@prisma/client'
import { AUTH_ROUTER } from '@/@App/Pages/Auth/configs/router'

const UserContext = createContext<UserConextProps>({} as UserConextProps)

type Props = {
	children: ReactNode
}

interface TokenProps {
	token: string
	roles: string[]
}

type UserType = Partial<User & TokenProps>

const initUser: UserType = {
	id: undefined,
	name: undefined,
	password: undefined,
	roles: [],
	email: undefined,
	token: undefined
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

	const reset = useCallback(() => {
		setUser(initUser)
		sessionStorage.removeItem(STORAGE_KEY.LOCAL_USER)
		router.push(AUTH_ROUTER.LOGIN)
	}, [])

	return <UserContext.Provider value={{ user, update, reset, login }}>{children}</UserContext.Provider>
}

export { UserContext }
export default React.memo(UserProvider)
