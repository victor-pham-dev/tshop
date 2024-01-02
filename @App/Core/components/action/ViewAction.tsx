import { EyeOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

interface Props {
	action: (data?: any) => any
}

const ViewAction = (props: Props) => {
	const { action } = props

	return (
		<Tooltip placement="topLeft" title={'Xem chi tiết'}>
			<Button onClick={action} type="default" className="w-max">
				<EyeOutlined />
			</Button>
		</Tooltip>
	)
}

export default ViewAction
