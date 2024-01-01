import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { Button, Form, Input, message } from 'antd'
import { adminWhiteListService } from '../../services/adminWhiteListService'
import { useRequest } from 'ahooks'

export const FormAddWhiteList = () => {
	const [form] = Form.useForm()
	const { triggerRefresh } = useCorePageContext()

	const { loading: submiting, run: handleSubmit } = useRequest(adminWhiteListService.save, {
		manual: true,
		onSuccess: data => {
			message.success(data?.message)
			triggerRefresh()
		},
		onError: error => message.error(error?.message)
	})

	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={handleSubmit}
			autoComplete="off"
			initialValues={{
				email: ''
			}}
		>
			<div className="flex items-end gap-2">
				<Form.Item
					name="email"
					className="w-full"
					label={<label className="textTheme">Email</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						},
						{
							type: 'email',
							message: 'Email sai định dạng'
						}
					]}
				>
					<Input className="w-full" />
				</Form.Item>
				<Form.Item>
					<Button loading={submiting} block type="primary" htmlType="submit">
						Thêm
					</Button>
				</Form.Item>
			</div>
		</Form>
	)
}
