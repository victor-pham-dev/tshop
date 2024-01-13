import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { Button, Form, Input, InputNumber, Tabs, TabsProps } from 'antd'
import { useWarehouseBillForm } from '../hooks/useWarehouseBillForm'
import InputRichText from '@/@App/Core/components/input/InputRichText'

export default function BillForm() {
	const items: TabsProps['items'] = [
		{
			key: 'import',
			label: 'Nhập hàng',
			children: <ImportForm />
		},
		{
			key: '2',
			label: 'Tab 2',
			children: 'Content of Tab Pane 2'
		},
		{
			key: '3',
			label: 'Tab 3',
			children: 'Content of Tab Pane 3'
		}
	]
	return <Tabs defaultActiveKey="1" items={items} />
}

function ImportForm() {
	const [form] = Form.useForm()

	const { id } = useCorePageContext()
	const { loadingCreateImportBill, onCreateImportBill } = useWarehouseBillForm({ form })
	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={onCreateImportBill}
			autoComplete="off"
			initialValues={{
				warehouseItemId: Number(id),
				reason: 'IMPORT',
				quantity: 1,
				price: 0
			}}
		>
			<div className="p-4 bg-gray-100 rounded-md ">
				<div className="hidden">
					<Form.Item name="warehouseItemId">
						<Input className="hidden" />
					</Form.Item>
					<Form.Item name="reason">
						<Input className="hidden" />
					</Form.Item>
				</div>

				<Form.Item
					name="quantity"
					label={<label className="textTheme">Số lượng nhập hàng</label>}
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
					name="price"
					label="Giá nhập"
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
				<Form.Item name="note" label="Ghi chú">
					{/* <InputRichText form={form} name="note" /> */}
				</Form.Item>

				<Form.Item wrapperCol={{ span: 24 }}>
					<Button loading={loadingCreateImportBill} block type="primary" htmlType="submit">
						Tạo đơn nhập hàng
					</Button>
				</Form.Item>
			</div>
		</Form>
	)
}
