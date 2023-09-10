import { useRequest } from 'ahooks'
import { authService } from '../../services/authServices'
import { useRouter } from 'next/router'
import { STATUS_CODE } from '@/const/app-const'
import { message } from 'antd'
import { AUTH_ROUTER } from '../../configs/router'
import { internalErrorMsg } from '@/ultis/msg'
export const useRegister = () => {
	const router = useRouter()

	const { loading, run } = useRequest(authService.register, {
		manual: true,
		onSuccess: data => {
			if (data?.code === STATUS_CODE.CREATED) {
				message.success(data?.msg)
				router.push(AUTH_ROUTER.LOGIN)
			} else {
				message.error(data?.msg)
			}
		},
		onError: err => {
			console.log(err)
			internalErrorMsg()
		}
	})

	const handleSubmit = (data: any) => {
		return run(data)
	}
	return { loading, handleSubmit }
}
