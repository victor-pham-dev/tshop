import { EyeOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

interface Props {
	action: (data?: any) => any
	tooltipTitle?: string
}

const ViewAction = (props: Props) => {
	const { action, tooltipTitle = 'Xem chi tiết' } = props

	return (
		<Tooltip placement="topLeft" title={tooltipTitle}>
			<Button onClick={action} type="default" className="w-max">
				<EyeOutlined className="text-blue-500" />
			</Button>
		</Tooltip>
	)
}

export default ViewAction
