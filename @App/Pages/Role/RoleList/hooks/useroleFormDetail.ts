import { useRouter } from 'next/router'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { ROLE_ROUTER } from '../../configs/router'
import { roleServices } from '../../services/roleServices'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

export const roleFormDetail = (id: number) => {
	const router = useRouter()

	const { triggerRefresh, handleCloseRoleModal } = useCoreContext()
	console.log('🚀 ~ file: useroleFormDetail.ts:12 ~ roleFormDetail ~ handleCloseRoleModal:', handleCloseRoleModal)

	const { loading: loadingSaveRole, run: saveRole } = useRequest(roleServices.save, {
		manual: true,
		onSuccess: data => {
			console.log('🚀 ~ file: roleFormDetail.ts:12 ~ roleFormDetail ~ data:', data)
			if (data.code === 500) {
				if (id !== 0) {
					message.error('Cập nhật quyền thất bại')
				} else {
					message.error('Tạo quyền thất bại')
				}
			} else {
				if (id !== 0) {
					message.success('Cập nhật quyền thành công')
				} else {
					message.success('Tạo quyền thành công')
				}
			}
			triggerRefresh()
			handleCloseRoleModal()
		},
		onError: error => {
			if (id !== 0) {
				message.error('Cập nhật quyền thất bại')
			} else {
				message.error('Tạo quyền thất bại')
			}
		}
	})

	return { loadingSaveRole, saveRole }
}
