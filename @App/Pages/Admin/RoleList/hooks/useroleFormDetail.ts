import { useRouter } from 'next/router'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { adminRoleService } from '../../services/adminRoleService'

export const roleFormDetail = (id: number) => {
	const router = useRouter()

	const { triggerRefresh, handleCloseRoleModal } = useCorePageContext()

	const { loading: loadingSaveRole, run: saveRole } = useRequest(adminRoleService.save, {
		manual: true,
		onSuccess: data => {
			message.success('Cập nhật quyền thành công')

			triggerRefresh()
			handleCloseRoleModal()
		},
		onError: error => {
			message.error(error?.message)
		}
	})

	return { loadingSaveRole, saveRole }
}
