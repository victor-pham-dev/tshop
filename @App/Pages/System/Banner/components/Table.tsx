import { Button, Image, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'

import { EditOutlined } from '@ant-design/icons'
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
			title: 'Ảnh',
			dataIndex: 'img',
			render: (data: string) => (
				<div className="w-[260px] aspect-video">
					<Image src={data} />
				</div>
			)
		},
		{
			title: 'Link khi click vào',
			dataIndex: 'link'
		},
		{
			title: 'Status',
			dataIndex: 'active',
			render: (data: boolean) => <Tag color={data ? 'green' : 'red'}> {data ? 'Hoạt động' : 'OFF'}</Tag>
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
