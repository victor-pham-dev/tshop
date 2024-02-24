import { useRequest } from 'ahooks'
import { adminUserService } from '../../services/adminUserService'
import { Button, Tooltip, message } from 'antd'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { LockOutlined, SafetyCertificateOutlined, UnlockOutlined } from '@ant-design/icons'
import { getStatusClassNames } from 'antd/es/_util/statusUtils'

interface ActionChangeStatusUserProps {
	id: number
	active: boolean
}
export const ActionChangeStatusUser = (props: ActionChangeStatusUserProps) => {
	const { id, active } = props
	const { triggerRefresh } = useCorePageContext()

	const { loading: loadingChangeActiveStatus, run: changeActiveStatus } = useRequest(
		adminUserService.changeActiveStatus,
		{
			manual: true,
			onSuccess: data => {
				message.success(data?.message)
				triggerRefresh()
			},
			onError: error => message.error(error?.message)
		}
	)

	return (
		<Tooltip placement="topLeft" title={active ? 'Block User này' : 'Unblock'}>
			<Button
				loading={loadingChangeActiveStatus}
				className=" w-max"
				onClick={() => changeActiveStatus({ active: !active, id })}
				type="dashed"
			>
				{active ? <LockOutlined className="text-red-500" /> : <UnlockOutlined className="text-green-500" />}
			</Button>
		</Tooltip>
	)
}
