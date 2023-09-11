import { useAntdTable } from 'ahooks'
import { Button, Image, Switch, Table, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { useEffect } from 'react'
import moment from 'moment'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
// import { PRODUCT_ROUTER } from '../../configs/router'
import { role, useDescriptionModal } from '../hooks/useRoleModal'

export default () => {
	const router = useRouter()
	const { getTableData } = useTable()
	const { tableProps, run } = useAntdTable(getTableData)
	const { handleOpenRoleModal, renderRoleModal } = useDescriptionModal()

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
				<Switch
					checkedChildren={<CheckOutlined />}
					unCheckedChildren={<CloseOutlined />}
					checked={data === 1}
				/>
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
			<Button onClick={() => handleOpenRoleModal()} type="primary" color="success" style={{ width: '20%', marginBottom: '10px' }}>
				Thêm Quyền
			</Button>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderRoleModal()}
		</>
	)
}
