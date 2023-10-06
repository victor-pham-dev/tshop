import { useAntdTable, useRequest } from 'ahooks'
import { Button, Image, Switch, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { useEffect } from 'react'
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
// import { PRODUCT_ROUTER } from '../../configs/router'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { roleUserServices } from '../../services/roleServices'
import { roleUserFormDetail } from '../hooks/roleUserFormDetail'

export default () => {
	const router = useRouter()
	const { tableProps } = useTable()

	const { handleOpenRoleModal, renderRoleModal } = useCoreContext()
	// const { type, changeType, submit, reset } = search
	const { loadingDeleteRole, deleteRole } = roleUserFormDetail()
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Tên User',
			dataIndex: ['user', 'name']
		},
		{
			title: 'ID User',
			dataIndex: ['user', 'id']
		},
		{
			title: 'Status',
			dataIndex: ['user', 'active'],
			render: (data: boolean) => <Tag color={data ? 'green' : 'red'}> {data ? 'Hoạt động' : 'OFF'}</Tag>
		},
		{
			title: 'Quyền',
			dataIndex: ['role', 'label']
		},
		{
			title: 'Hành động',
			render: (data: any) => {
				return (
					<div className="flex flex-col gap-2">
						<Tooltip placement="topLeft" title={'Chỉnh sửa'}>
							<Button loading={loadingDeleteRole} className='flex justify-center items-center' onClick={() => deleteRole(data.id)} type="primary" style={{ width: '25%', backgroundColor: 'red' }}>
								<DeleteOutlined />
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
				Thêm Quyền User
			</Button>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderRoleModal()}
		</>
	)
}
