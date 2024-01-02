import { EditOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

interface Props {
	action: (data?: any) => any
}

const EditAction = (props: Props) => {
	const { action } = props

	return (
		<Tooltip placement="topLeft" title={'Chỉnh sửa'}>
			<Button onClick={action} type="primary" className="w-max">
				<EditOutlined />
			</Button>
		</Tooltip>
	)
}

export default EditAction
