import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { Button, Form, Input, InputNumber, Tabs, TabsProps } from 'antd'
import { useWarehouseBillForm } from '../hooks/useWarehouseBillForm'
import InputRichText from '@/@App/Core/components/input/InputRichText'
import { WareHouseBill } from '@prisma/client'

interface Props {
	initData: WareHouseBill
	handleCloseModal: () => void
}

export default function EditBillForm({ initData, handleCloseModal }: Props) {
	const [form] = Form.useForm()

	const { id } = useCorePageContext()
	const { loadingCreateImportBill, onCreateImportBill } = useWarehouseBillForm({ form, handleCloseModal })

	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={onCreateImportBill}
			autoComplete="off"
			initialValues={{
				id: Number(initData.id),
				warehouseItemId: Number(id),
				reason: initData.reason,
				quantity: initData.quantity,
				price: initData.price,
				note: initData.note
			}}
		>
			<div className="p-4 bg-gray-100 rounded-md ">
				<div className="hidden">
					<Form.Item name="id">
						<Input className="hidden" />
					</Form.Item>
					<Form.Item name="warehouseItemId">
						<Input className="hidden" />
					</Form.Item>
					<Form.Item name="reason">
						<Input className="hidden" />
					</Form.Item>
				</div>

				<Form.Item
					name="quantity"
					label={<label className="textTheme">Số lượng</label>}
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
					label="Giá "
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
					<InputRichText form={form} name="note" />
				</Form.Item>

				<Form.Item wrapperCol={{ span: 24 }}>
					<Button loading={loadingCreateImportBill} block type="primary" htmlType="submit">
						Sửa
					</Button>
				</Form.Item>
			</div>
		</Form>
	)
}
