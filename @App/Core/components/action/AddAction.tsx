import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

interface Props {
	action: (data?: any) => any
}

const AddAction = (props: Props) => {
	const { action } = props

	return (
		<Tooltip placement="topLeft" title={'Thêm'}>
			<Button onClick={action} type="primary" className="w-max">
				<PlusOutlined />
			</Button>
		</Tooltip>
	)
}

export default AddAction
