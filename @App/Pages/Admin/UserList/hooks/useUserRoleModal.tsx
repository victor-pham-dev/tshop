import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { Button, Form, Modal, Spin, Tabs, TabsProps, Typography, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { CoreSelectWithApi } from '@/@App/Core/components'
import { adminRoleService } from '../../services/adminRoleService'
import { useRequest } from 'ahooks'
import { adminUserRoleService } from '../../services/adminUserRoleService'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { error } from 'console'

interface RoleProps {
	id: number
	roleId: number
	userId: number
	role: {
		id: number
		label: string
		alias: string
		isActive: boolean
	}
}

export const useUserRoleModal = () => {
	const [open, setOpen] = useState(false)
	const [roles, setRoles] = useState<RoleProps[]>([])
	console.log('🚀 ~ file: useUserRoleModal.tsx:25 ~ useUserRoleModal ~ roles:', roles)
	const [userId, setUserId] = useState<number | null>(null)

	const handleOpen = (roles: RoleProps[], userId: number) => {
		setOpen(true)
		setRoles(roles)
		setUserId(userId)
	}

	const handleClose = () => setOpen(false)

	const handleAddRole = useCallback((data: any) => {
		setRoles(prev => [...prev, data])
	}, [])

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Danh sách quyền ',
			children: <RoleList roles={roles} setRoles={setRoles} />
		},
		{
			key: '2',
			label: 'Thêm quyền mới',
			children: userId ? <AddRoleForm userId={userId} handleAddRole={handleAddRole} /> : <Spin />
		}
	]

	const render = () => {
		return (
			open && (
				<Modal open={open} onCancel={handleClose} footer={null} title={'Danh sách quyền người dùng'}>
					<Tabs items={items} />
				</Modal>
			)
		)
	}

	return { handleOpenUserRoleModal: handleOpen, renderUserRoleModal: render, handleCloseUserRoleModal: handleClose }
}

interface AddRoleFormProps {
	userId: number
	handleAddRole: (data: any) => void
}

export const AddRoleForm = (props: AddRoleFormProps) => {
	const { userId, handleAddRole } = props
	const [form] = Form.useForm()
	const { triggerRefresh } = useCorePageContext()

	const { loading: loadingSubmit, run: handleSubmit } = useRequest(adminUserRoleService.save, {
		manual: true,
		onSuccess: data => {
			triggerRefresh()
			message.success(data?.message)
			handleAddRole(data?.data)
		},
		onError: error => {
			message.error(error?.message)
		}
	})

	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={handleSubmit}
			autoComplete="off"
			initialValues={{ userId }}
		>
			<div className="p-4 bg-gray-100 rounded-md ">
				<Form.Item className="hidden" name="userId" />
				<Form.Item
					name="roleId"
					label={<label className="textTheme">Chọn quyền</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng chọn!'
						}
					]}
				>
					<CoreSelectWithApi
						apiService={adminRoleService.search}
						// name="roleId"
						customRender={(option: any) => option?.label}
					/>
				</Form.Item>

				<Form.Item wrapperCol={{ span: 24 }}>
					<Button loading={loadingSubmit} block type="primary" htmlType="submit">
						Thêm quyền
					</Button>
				</Form.Item>
			</div>
		</Form>
	)
}

interface RoleListProps {
	roles: RoleProps[]
	setRoles: Dispatch<SetStateAction<RoleProps[]>>
}

export const RoleList = (props: RoleListProps) => {
	const { roles, setRoles } = props

	const [deletingId, setDeletingId] = useState<number>(0)

	const handleDelete = async (id: string) => {
		setDeletingId(Number(id))
		try {
			const data = await adminUserRoleService.remove(id)
			message.success(data?.message)
			setRoles(prev => prev.filter(item => String(item?.id) !== String(data?.data?.id)))
		} catch (error: any) {
			message.error(error?.message)
		}
		setDeletingId(0)
	}

	return (
		<div className="flex flex-col gap-2">
			{roles?.map(item => (
				<div
					key={item.id + Math.random()}
					className="flex items-center justify-between p-2 rounded-md bg-blue-50"
				>
					<Typography.Text>{item.role.label}</Typography.Text>
					<Button
						type="primary"
						danger
						loading={deletingId === item.id}
						onClick={() => handleDelete(String(item.id))}
					>
						<DeleteOutlined />
					</Button>
				</div>
			))}
		</div>
	)
}
