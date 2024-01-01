import { useRequest } from 'ahooks'
import { authService } from '../../services/authServices'
import { useRouter } from 'next/router'
// import { STATUS_CODE } from '@/const/app-const'
import { message } from 'antd'
import { AUTH_ROUTER } from '../../configs/router'
// import { internalErrorMsg } from '@/ultis/msg'
export const useRegister = () => {
	const router = useRouter()

	const { loading, run } = useRequest(authService.register, {
		manual: true,
		onSuccess: data => {
			message.success(data?.msg)
			router.push(AUTH_ROUTER.LOGIN)
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
