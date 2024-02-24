import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Tooltip } from 'antd'
import { useState } from 'react'

interface Props {
	action: (data?: any) => Promise<any>
	title?: string
	description?: string
}

const DeleteAction = (props: Props) => {
	const { action, title = 'Xoá', description = 'Xác nhận xoá ?' } = props
	const [loading, setLoading] = useState(false)

	const onConfirm = async () => {
		setLoading(true)
		await action()
		setLoading(false)
	}

	return (
		<Popconfirm
			title={title}
			description={description}
			onConfirm={onConfirm}
			okText="Xoá"
			cancelText="Quay lại"
			icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
		>
			<Tooltip placement="topLeft" title="Xoá">
				<Button type="primary" danger loading={loading} className="w-max">
					<DeleteOutlined />
				</Button>
			</Tooltip>
		</Popconfirm>
	)
}

export default DeleteAction
