import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { categoryService } from '../../services/categoryService'

export const useCategoryFormDetail = () => {
	const { triggerRefresh, handleCloseDetailModal } = useCorePageContext()

	const { loading: loadingSubmit, run: onSubmit } = useRequest(categoryService.save, {
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
