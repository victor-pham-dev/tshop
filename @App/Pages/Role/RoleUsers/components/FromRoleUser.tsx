import { useState } from 'react'
import { Form, Button } from 'antd'
import { roleUserFormDetail } from '../hooks/roleUserFormDetail'
import { CoreSelectWithApi } from '@/@App/@Core/components'
import { roleServices, usersServices } from '../../services/roleServices'

export const FromRole = () => {
	const [form] = Form.useForm()
	const { loadingSaveRoleUser, saveRoleUser } = roleUserFormDetail()

	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={saveRoleUser}
			autoComplete="off"
		>
			<div className="p-4 bg-gray-100 rounded-md ">
				<Form.Item
					name="userId"
					label={<label className="textTheme">Tên User</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						}
					]}
				>
					<CoreSelectWithApi
						apiService={usersServices.search}
						name="user"
						customRender={(option: any) => <>{`${option?.id} --  ${option?.name}`}</>}
					/>
				</Form.Item>
				<Form.Item
					name="roleId"
					label={<label className="textTheme">Tên quyền</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						}
					]}
				>
					<CoreSelectWithApi
						apiService={roleServices.search}
						name="role"
						customRender={(option: any) => <>{`${option?.label} --  ${option?.alias}`}</>}
					/>
				</Form.Item>
				<Form.Item wrapperCol={{ span: 24 }}>
					<Button loading={loadingSaveRoleUser} block type="primary" htmlType="submit">
						Thêm quyền
					</Button>
				</Form.Item>
			</div>
		</Form>
	)
}
