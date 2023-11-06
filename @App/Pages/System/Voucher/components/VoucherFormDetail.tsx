import { Form, Input, Button, InputNumber, DatePicker, ConfigProvider } from 'antd'
import { useFormDetail } from '../hooks/useFormDetail'

import locale from 'antd/locale/vi_VN'
import dayjs from 'dayjs'

import 'dayjs/locale/vi'

export const VoucherFormDetail = (props: any) => {
	const { data } = props
	const [form] = Form.useForm()

	const { loadingSubmit, onSubmit } = useFormDetail()

	return (
		<ConfigProvider locale={locale}>
			<Form
				form={form}
				name="newPost"
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				onFinish={onSubmit}
				autoComplete="off"
				initialValues={{
					id: data?.data?.id,
					code: data?.data?.code,
					usageCount: data?.data?.usageCount ?? 1,
					activeAt: dayjs(data?.data?.activeAt),
					dueAt: dayjs(data?.data?.dueAt),
					description: data?.data?.description,
					priceMin: data?.data?.priceMin ?? 0,
					discount: data?.data?.discount ?? 0
				}}
			>
				<Form.Item name="id">
					<Input className="hidden" />
				</Form.Item>
				<Form.Item
					name="code"
					label={<label className="textTheme">CODE</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						}
					]}
				>
					<Input disabled={data?.data?.id} />
				</Form.Item>
				<Form.Item
					name="usageCount"
					label={<label className="textTheme">Lượt sử dụng</label>}
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						},
						{
							validator: (_, value) => {
								if (!value || value < 1) {
									return Promise.reject('Lớn hơn hoặc bằng 1')
								}

								return Promise.resolve()
							}
						}
					]}
				>
					<InputNumber className="w-full" />
				</Form.Item>
				<Form.Item
					name="discount"
					label="Số tiền giảm"
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						},
						{
							validator: (_, value) => {
								if (value === 0) {
									return Promise.resolve()
								}
								if (!value || value < 0) {
									return Promise.reject('Lớn hơn hoặc bằng 0')
								}

								return Promise.resolve()
							}
						}
					]}
				>
					<InputNumber
						className="w-full"
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				</Form.Item>
				<Form.Item
					name="priceMin"
					label="Giá tối thiểu để áp dụng mã này"
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						},
						{
							validator: (_, value) => {
								if (value === 0) {
									return Promise.resolve()
								}
								if (!value || value < 0) {
									return Promise.reject('Lớn hơn hoặc bằng 0')
								}

								return Promise.resolve()
							}
						}
					]}
				>
					<InputNumber
						className="w-full"
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				</Form.Item>

				<Form.Item name="description" label={<label className="textTheme">Mô tả</label>}>
					<Input.TextArea />
				</Form.Item>

				<Form.Item
					name="activeAt"
					label="Thời gian có hiệu lực"
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						}
					]}
				>
					<DatePicker showTime placeholder="Chọn ngày" />
				</Form.Item>
				<Form.Item
					name="dueAt"
					label="Thời gian hết hiệu lực"
					rules={[
						{
							required: true,
							message: 'Vui lòng điền!'
						}
					]}
				>
					<DatePicker showTime placeholder="Chọn ngày" />
				</Form.Item>

				<Button loading={loadingSubmit} block type="primary" htmlType="submit">
					{data?.data?.id ? 'Sửa ' : 'Tạo '}
				</Button>
			</Form>
		</ConfigProvider>
	)
}

// description: string
// dueAt: Date
// code: string
// usageCount: number
// activeAt: Date
