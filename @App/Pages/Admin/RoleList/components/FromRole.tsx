import { Form, Input, Switch, Button } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { roleFormDetail } from '../hooks/useroleFormDetail'
import { role } from '../hooks/useRoleModal'

interface FromRoleProps {
	data: role | null | undefined
}
export const FromRole = (props: FromRoleProps) => {
	let { data } = props
	const [form] = Form.useForm()

	const { loadingSaveRole, saveRole } = roleFormDetail(data?.id ?? 0)

	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={saveRole}
			autoComplete="off"
			initialValues={{
				id: data?.id,
				label: data?.label,
				alias: data?.alias,
				isActive: data?.isActive ?? true
			}}
		>
			<div className="p-4 bg-gray-100 rounded-md ">
				<Form.Item
					name="label"
					label={<label className="textTheme">Tên quyền</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						}
					]}
				>
					<Input placeholder="Tên Quyền" />
				</Form.Item>
				<Form.Item
					name="alias"
					label={<label className="textTheme">Alias</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						}
					]}
				>
					<Input placeholder="Alias" />
				</Form.Item>

				<Form.Item
					valuePropName="checked"
					name="isActive"
					label={<label className="textTheme">Trạng thái hoạt động</label>}
				>
					<Switch />
				</Form.Item>
				<Form.Item className="h-0 p-0 m-0" name="id"></Form.Item>
				<Form.Item wrapperCol={{ span: 24 }}>
					<Button loading={loadingSaveRole} block type="primary" htmlType="submit">
						{data?.id ? 'Sửa quyền' : 'Tạo quyền'}
					</Button>
				</Form.Item>
			</div>
		</Form>
	)
}
