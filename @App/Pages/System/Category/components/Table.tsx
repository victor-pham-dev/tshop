import { Button, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'

import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { Role } from '@prisma/client'

export default () => {
	const router = useRouter()
	const { tableProps } = useTable()

	const { handleOpenDetailModal } = useCoreContext()

	// const { type, changeType, submit, reset } = search

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Tên Quyền',
			dataIndex: 'label'
		},
		{
			title: 'Alias',
			dataIndex: 'alias'
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			render: (data: number) => (
				<Tag color={data === 1 ? 'green' : 'red'}> {data === 1 ? 'Hoạt động' : 'OFF'}</Tag>
			)
		},
		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: Role) => {
				return (
					<div className="flex flex-col gap-2">
						<Tooltip placement="topLeft" title={'Chỉnh sửa'}>
							<Button
								onClick={() => handleOpenDetailModal(data?.id)}
								type="primary"
								color="success"
								style={{ width: '50%' }}
							>
								<EditOutlined />
							</Button>
						</Tooltip>
					</div>
				)
			}
		}
	]
	return (
		<>
			<Button
				onClick={() => handleOpenDetailModal('new')}
				type="primary"
				color="success"
				style={{ width: '20%', marginBottom: '10px' }}
			>
				Thêm mới
			</Button>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{/* {renderRoleModal()} */}
		</>
	)
}
