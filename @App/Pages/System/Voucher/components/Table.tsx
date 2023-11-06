import { Button, Image, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'

import { EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { Role } from '@prisma/client'
import moment from 'moment'
import clsx from 'clsx'
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
			title: 'CODE',
			dataIndex: 'code'
		},
		{
			title: 'Lượt sử dụng',
			dataIndex: 'usageCount'
		},
		{
			title: 'Số tiền giảm',
			dataIndex: 'discount',
			render: (data: number) => <>{data?.toLocaleString()}</>
		},
		{
			title: 'Giá tối thiểu',
			dataIndex: 'priceMin',
			render: (data: number) => <>{data?.toLocaleString()}</>
		},
		{
			title: 'Thời gian có hiệu lực',
			dataIndex: 'activeAt',
			render: (data: Date) => {
				console.log(data)
				return (
					<span
						className={clsx('text-white p-2 rounded-md', {
							'bg-green-500': moment(data) > moment(),
							'bg-red-500': moment(data) < moment()
						})}
					>
						{moment(data).format('HH:mm - DD/MM/YYYY')}
					</span>
				)
			}
		},
		{
			title: 'Thời gian hết hiệu lực',
			dataIndex: 'dueAt',
			render: (data: Date) => {
				console.log(data)
				return (
					<span
						className={clsx('text-white p-2 rounded-md', {
							'bg-green-500': moment(data) > moment(),
							'bg-red-500': moment(data) < moment()
						})}
					>
						{moment(data).format('HH:mm - DD/MM/YYYY')}
					</span>
				)
			}
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
