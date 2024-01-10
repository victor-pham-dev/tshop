import { Button, Table, Tag, Tooltip } from 'antd'
import { useUserTable } from '../hooks/useUserTable'
import moment from 'moment'
import { useRouter } from 'next/router'

import { ActionChangeStatusUser } from './UserTableAction'
import { useUserRoleModal } from '../hooks/useUserRoleModal'
import { GrUserAdmin } from 'react-icons/gr'

export default function UserTable() {
	const router = useRouter()
	const { tableProps } = useUserTable()
	// const { renderRoleModal, triggerRefresh } = useCorePageContext()
	const { renderUserRoleModal, handleCloseUserRoleModal, handleOpenUserRoleModal } = useUserRoleModal()
	// const { type, changeType, submit, reset } = search
	// const { loadingDeleteRole, deleteRole } = roleUserFormDetail()

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Tên User',
			dataIndex: 'name'
		},
		{
			title: 'Email',
			dataIndex: 'email'
		},
		{
			title: 'Quyền',
			dataIndex: 'ROLES',
			render: (data: any[]) => <>{data?.length} Quyền</>
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			
			render: (data: string) => moment(data).format('HH:mm DD/MM/YYYY')
		},
		{
			title: 'Hoạt động',
			dataIndex: 'active',
			render: (data: boolean) => <Tag color={data ? 'green' : 'red'}> {data ? 'Hoạt động' : 'Đã chặn'}</Tag>
		},

		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: any) => {
				const { active, id, ROLES } = data
				return (
					<div className="flex gap-2">
						<Tooltip placement="topLeft" title={'Phân quyền User'}>
							<Button
								className=" w-max"
								onClick={() => handleOpenUserRoleModal(ROLES ?? [], id)}
								type="primary"
							>
								<GrUserAdmin />
							</Button>
						</Tooltip>
						<ActionChangeStatusUser id={id} active={active} />
					</div>
				)
			}
		}
	]
	return (
		<>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderUserRoleModal()}
		</>
	)
}
