import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { voucherService } from '../../services/voucherService'

export const useFormDetail = () => {
	const { triggerRefresh, handleCloseDetailModal } = useCoreContext()

	const { loading: loadingSubmit, run: onSubmit } = useRequest(voucherService.save, {
		manual: true,
		onSuccess: data => {
			message.success(data?.msg)
			triggerRefresh()
			handleCloseDetailModal()
		},
		onError: error => {
			message.error(error?.message)
		}
	})

	return { loadingSubmit, onSubmit }
}
