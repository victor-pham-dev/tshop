import { CoreCard } from '@/@App/Core/components'
import { SYSTEM_ROUTER } from '@/@App/Pages/System/configs/router'
import { systemCategoryFilterService } from '@/@App/Pages/System/services/systemCategoryFilterService'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Select, Space, message } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { useRouter } from 'next/router'
import { MemoExoticComponent, memo } from 'react'
import { FaTrash } from 'react-icons/fa'

interface CustomFieldData {
	name: string
	value?: any
	touched?: boolean
	validating?: boolean
	errors?: string[]
	rules?: any
}

const AddCategoryForm = () => {
	const router = useRouter()
	const { id } = router.query
	const [form] = Form.useForm()

	const handleSubmitCategoryFilterForm = async (values: any) => {
		console.log(values)
		try {
			await systemCategoryFilterService.save(values)
			message.success(id === 'new' ? 'Tạo thành công' : 'Cập nhật thành công')

			router.push(SYSTEM_ROUTER.CATEGORY_FILTER)
		} catch (error: any) {
			message.error(error?.message)
		}
	}

	const currentFiltersValue = Form.useWatch('filters', form)
	// console.log('🚀 ~ currentFiltersValue:', currentFiltersValue)
	return (
		<Form
			form={form}
			layout="vertical"
			className="w-full p-4 bg-gray-200"
			name="basic"
			// labelCol={{ span: 8 }}
			// wrapperCol={{ span: 30 }}
			// style={{ width: 600 }}
			onFinish={handleSubmitCategoryFilterForm}
			// onFinishFailed={onFinishFailed}
			// onValuesChange={handleChange}
			autoComplete="off"
			initialValues={
				{
					// filters: [{ label: '', valueType: '', option: '' }]
				}
			}
		>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<CoreCard className="">
					<Form.Item
						label="Tên bộ lọc"
						name="name"
						rules={[{ required: true, message: 'Vui lòng nhập tên bộ lọc' }]}
					>
						<Input size="large" />
					</Form.Item>

					<Form.Item label="Mô tả" name="description">
						<Input.TextArea placeholder="Nhập mô tả cho bộ lọc này" />
					</Form.Item>

					<Button htmlType="submit" type="primary" className="w-full mt-3">
						Submit
					</Button>
				</CoreCard>

				<CoreCard>
					<p className="font-600 text-[1rem] my-4">Các thuộc tính của bộ lọc:</p>
					<Form.List name="filters">
						{(fields, { add, remove }) => (
							<div className="flex flex-col gap-4">
								{fields.map(({ key, name, ...restField }) => {
									const selectedValueType = currentFiltersValue[key ?? 0]?.valueType

									return (
										<div key={`truong-${key}`} className="flex items-center gap-4">
											<CoreCard className="!bg-gray-200 w-4/5">
												<Form.Item
													{...restField}
													label="Tên phân loại"
													name={[name, 'label']}
													rules={[{ required: true, message: 'Vui lòng điền tên phân loại' }]}
												>
													<Input size="large" placeholder="Nhập tên phân loại" />
												</Form.Item>
												<Form.Item
													{...restField}
													name={[name, 'valueType']}
													label="Kiểu dữ liệu"
													rules={[{ required: true, message: 'Vui lòng chọn kiểu dữ liệu' }]}
												>
													<Select
														placeholder="Vui lòng chọn"
														size="large"
														options={[
															{
																value: 'STRING',
																label: 'Nhập chữ'
															},
															{
																value: 'NUMBER',
																label: 'Nhập số'
															},
															{
																value: 'DATETIME',
																label: 'Chọn / nhập thời gian'
															},
															{
																value: 'SELECT',
																label: 'Lựa chọn'
															}
														]}
													/>
												</Form.Item>

												<Form.Item
													{...restField}
													valuePropName="checked"
													name={[name, 'required']}
												>
													<Checkbox>Bắt buộc điền</Checkbox>
												</Form.Item>
												<DynamicOptionForSelect
													valueType={selectedValueType}
													name={[name, 'options']}
												/>
											</CoreCard>
											<div>
												<Button onClick={() => remove(name)} danger type="primary">
													<FaTrash />
												</Button>
											</div>
										</div>
									)
								})}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() =>
											add({
												label: '',
												valueType: 'STRING',
												required: true,
												options: []
											})
										}
										block
										icon={<PlusOutlined />}
									>
										Thêm phân loại
									</Button>
								</Form.Item>
							</div>
						)}
					</Form.List>
				</CoreCard>
			</div>
		</Form>
	)
}
export default AddCategoryForm

interface DynamicOptionForSelectProps {
	valueType: string
	name: NamePath
}

export const DynamicOptionForSelect: React.FC<DynamicOptionForSelectProps> = props => {
	const { valueType, name } = props
	if (valueType !== 'SELECT') {
		return null
	}

	return (
		<Form.List name={name}>
			{(fields, { add, remove }) => (
				<CoreCard className="flex flex-col gap-4">
					{fields.map(({ key, name, ...restField }) => {
						return (
							<div key={Math.random().toString() + key} className="flex items-center gap-4">
								<Form.Item
									{...restField}
									label={`Lựa chọn ${key + 1}`}
									name={[name, 'value']}
									className="w-4/5"
									rules={[{ required: true, message: 'Vui lòng điền giá trị' }]}
								>
									<Input size="large" placeholder="Điền giá trị" />
								</Form.Item>

								<div>
									<Button onClick={() => remove(name)} danger type="primary">
										<FaTrash />
									</Button>
								</div>
							</div>
						)
					})}
					<Form.Item>
						<Button
							type="dashed"
							onClick={() =>
								add({
									value: ''
								})
							}
							block
							icon={<PlusOutlined />}
						>
							Thêm lựa chọn
						</Button>
					</Form.Item>
				</CoreCard>
			)}
		</Form.List>
	)
}
