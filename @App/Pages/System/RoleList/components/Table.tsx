import { useAntdTable } from 'ahooks'
import { Button, Image, Switch, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { useEffect } from 'react'
import moment from 'moment'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
// import { PRODUCT_ROUTER } from '../../configs/router'
import { role, useRoleModal } from '../hooks/useRoleModal'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

export default () => {
	const router = useRouter()
	const { tableProps } = useTable()

	const { handleOpenRoleModal, renderRoleModal } = useCoreContext()

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
			render: (data: role) => {
				return (
					<div className="flex flex-col gap-2">
						<Tooltip placement="topLeft" title={'Chỉnh sửa'}>
							<Button
								onClick={() => handleOpenRoleModal(data)}
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
				onClick={() => handleOpenRoleModal()}
				type="primary"
				color="success"
				style={{ width: '20%', marginBottom: '10px' }}
			>
				Thêm Quyền
			</Button>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderRoleModal()}
		</>
	)
}
