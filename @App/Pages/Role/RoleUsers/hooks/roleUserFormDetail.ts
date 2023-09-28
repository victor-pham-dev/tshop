import { useRouter } from 'next/router'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { ROLE_ROUTER } from '../../configs/router'
import { roleUserServices } from '../../services/roleServices'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

export const roleUserFormDetail = () => {
	const router = useRouter()

	const { triggerRefresh, handleCloseRoleModal } = useCoreContext()

	const { loading: loadingSaveRoleUser, run: saveRoleUser } = useRequest(roleUserServices.save, {
		manual: true,
		onSuccess: data => {
			console.log("🚀 ~ file: roleUserFormDetail.ts:16 ~ roleUserFormDetail ~ data:", data)
			if (data.code === 500) {
				message.error('Tạo quyền cho user thất bại')
			} else {
				message.success('Tạo quyền cho user thành công')
			}
			triggerRefresh()
			handleCloseRoleModal()
		},
		onError: error => {
			message.error('Tạo quyền cho user thất bại')
		}
	})
	const { loading: loadingDeleteRole, run: deleteRole } = useRequest(roleUserServices.remove, {
		manual: true,
		onSuccess: data => {
			console.log("🚀 ~ file: roleUserFormDetail.ts:32 ~ roleUserFormDetail ~ data:", data)
			if (data.code === 500) {
				message.error('Xóa quyền user thất bại')
			} else {
				message.success('Xóa quyền user thành công')
			}
			triggerRefresh()
			handleCloseRoleModal()
		},
		onError: error => {
			message.error('Xóa quyền user thất bại')
		}
	})

	return { loadingSaveRoleUser, saveRoleUser, loadingDeleteRole, deleteRole }
}
