import { Button, Image, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'

import { EditOutlined, EyeOutlined, FolderViewOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { Product, Role } from '@prisma/client'
import moment from 'moment'
import clsx from 'clsx'
import { WAREHOUSE_ROUTER } from '../../../configs/router'
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
			title: '',
			dataIndex: 'Product',
			render: (data: Product) => <img alt="123" className="w-32 h-32" src={JSON.parse(data?.images)[0]} />
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'Product',
			render: (data: Product) => <>{data?.name}</>
		},

		{
			title: 'Số lượng trong kho',
			dataIndex: 'quantity',
			render: (data: number) => (
				<span
					className={clsx('rounded-md text-white  p-4', {
						'bg-red-500': data === 0,
						'bg-green-500': data > 4,
						'bg-orange-500': data > 0
					})}
				>
					{data.toLocaleString()}
				</span>
			)
		},

		{
			title: 'Cập nhật gần nhất',
			dataIndex: 'updatedAt',
			render: (data: Date) => {
				console.log(data)
				return <span>{moment(data).format('HH:mm - DD/MM/YYYY')}</span>
			}
		},
		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: Role) => {
				return (
					<div className="flex flex-col gap-2">
						<Tooltip placement="topLeft" title={'Chi tiết'}>
							<Button
								onClick={() => router.push(WAREHOUSE_ROUTER.DETAIL(data?.id?.toString()))}
								type="primary"
								color="success"
								style={{ width: '50%' }}
							>
								<EyeOutlined />
							</Button>
						</Tooltip>
					</div>
				)
			}
		}
	]
	return (
		<>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{/* {renderRoleModal()} */}
		</>
	)
}
