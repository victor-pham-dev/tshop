import { Form, Input, Switch, Button } from 'antd'
import { useFormDetail } from '../hooks/useFormDetail'

export const BannerFormDetail = (props: any) => {
	const {
		data: { data }
	} = props
	console.log('🚀 ~ file: CategoryFromDetail.tsx:8 ~ CategoryFromDetail ~ data:', data)
	const [form] = Form.useForm()

	const { loadingSubmit, onSubmit } = useFormDetail()

	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={onSubmit}
			autoComplete="off"
			initialValues={{
				id: data?.id,
				img: data?.img,
				link: data?.link,
				active: data?.active,
				description: data?.description
			}}
		>
			<Form.Item name="id">
				<Input className="hidden" />
			</Form.Item>
			<Form.Item
				name="img"
				label={<label className="textTheme">Link ảnh</label>}
				rules={[
					{
						required: true,
						message: 'Vui lòng điền!'
					}
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="link"
				label={<label className="textTheme">Link click vào ảnh</label>}
				rules={[
					{
						required: true,
						message: 'Vui lòng điền!'
					}
				]}
			>
				<Input placeholder="link" />
			</Form.Item>

			<Form.Item name="description" label={<label className="textTheme">Mô tả</label>}>
				<Input.TextArea />
			</Form.Item>

			<Form.Item name="active" valuePropName="active" label={<label className="textTheme">Hiển thị</label>}>
				<Switch defaultChecked={data?.active} />
			</Form.Item>

			<Button loading={loadingSubmit} block type="primary" htmlType="submit">
				{data?.id ? 'Sửa ' : 'Tạo '}
			</Button>
		</Form>
	)
}
