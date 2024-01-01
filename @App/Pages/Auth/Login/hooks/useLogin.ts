import { useRequest } from 'ahooks'
import { authService } from '../../services/authServices'
import { message } from 'antd'
import { useUserInfo } from '@/@App/Core/provider/AuthProvider'
import { useUser } from '@/@App/Core/provider/UserProvider'

export const useLogin = () => {
	const { login } = useUser()
	const { fetchAuth } = useUserInfo()
	const { loading, run } = useRequest(authService.login, {
		manual: true,
		onSuccess: data => {
			login(data?.data?.accessToken)
			message.success(data?.message)
			fetchAuth()
		},
		onError: err => {
			message.error(err?.message)
		}
	})

	const handleSubmit = (data: any) => {
		return run(data)
	}
	return { loading, handleSubmit }
}
