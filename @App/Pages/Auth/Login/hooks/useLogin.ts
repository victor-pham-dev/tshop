import { useRequest } from 'ahooks'
import { authService } from '../../services/authServices'
import { STATUS_CODE } from '@/const/app-const'
import { message } from 'antd'
import { internalErrorMsg } from '@/ultis/msg'
import { useUser } from '@/hooks'
import { useUserInfo } from '@/@App/@Core/provider/AuthProvider'
export const useLogin = () => {
	const { login } = useUser()
	const { fetchAuth } = useUserInfo()
	const { loading, run } = useRequest(authService.login, {
		manual: true,
		onSuccess: data => {
			if (data?.code === STATUS_CODE.OK) {
				login(data?.data?.accessToken)
				message.success(data?.msg)
				fetchAuth()
			} else {
				message.error(data?.msg)
			}
		},
		onError: () => {
			internalErrorMsg()
		}
	})

	const handleSubmit = (data: any) => {
		return run(data)
	}
	return { loading, handleSubmit }
}
