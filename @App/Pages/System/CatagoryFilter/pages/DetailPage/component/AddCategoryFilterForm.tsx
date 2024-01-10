import { CoreCard } from '@/@App/Core/components'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'

interface CustomFieldData {
	name: string
	value?: any
	touched?: boolean
	validating?: boolean
	errors?: string[]
	rules?: any
}

const AddCategoryForm = () => {
	const [form] = Form.useForm()

	// const data = form.getFieldValue(["valueType"])
	// console.log(data);

	const handleOptionChange = (value: any) => {
		const isSelected = value === 'select'
		const fieldData: CustomFieldData = {
			name: 'option',
			rules: [{ required: isSelected, message: 'Vui lòng nhập giá trị cho ô input' }]
		}

		form.setFields([fieldData])
	}

	const onFinish = (values: any) => {
		console.log(values)
	}

	const currentFiltersValue = Form.useWatch('filters', form)
	console.log('🚀 ~ currentFiltersValue:', currentFiltersValue)
	return (
		<Form
			form={form}
			layout="vertical"
			className="w-full bg-gray-200 p-4"
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 30 }}
			// style={{ width: 600 }}
			onFinish={value => onFinish(value)}
			// onFinishFailed={onFinishFailed}
			// onValuesChange={handleChange}
			autoComplete="off"
			initialValues={{
				filters: [{label: '', valueType: '', option: ''}]
			}}
		>
			<Form.Item
				label="Name"
				name="name"
				rules={[{ required: true, message: 'Please input category filter name!' }]}
			>
				<Input size="large" className="" />
			</Form.Item>

			<Form.Item label="Description" name="description">
				<Input.TextArea />
			</Form.Item>

			<Form.List name="filters">
				{(fields, { add, remove }) => {
					return (
						<div className="bg-white p-2">
							<Button
								type="primary"
								color="success"
								onClick={() => add({ label: '', valueType: '', option: '' })}
								style={{ width: '20%', marginBottom: '10px' }}
								block
								icon={<PlusOutlined />}
							>
								Thêm
							</Button>
							{fields.map(({ key, name, ...restField }, index) => {
								console.log(key);

								var selectValue = (currentFiltersValue[name]) ? currentFiltersValue[key]?.valueType : null
								
								// if (currentFiltersValue[key]?.valueType) {
								// 	var selectValue = currentFiltersValue[key]?.valueType;
								// 	console.log(selectValue,'select1');
									
								// }

								return (
									<Space
										key={key}
										style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
										align="baseline"
									>
										<div className="bg-gray-200 w-[400px] p-2">
											<Form.Item
												className="w-full"
												{...restField}
												name={[name, 'label']}
												rules={[{ required: true, message: 'Missing Label' }]}
											>
												<Input placeholder="Label" />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'valueType']}
												// name="valueType"
												rules={[{ required: true, message: 'Missing Value Type' }]}
											>
												<Select
													placeholder="ValueType"
													// defaultValue=""
													style={{ width: '100%' }}
													// onChange={handleChange}
													options={[
														{ value: 'string', label: 'String' },
														{ value: 'number', label: 'Number' },
														{ value: 'dateTime', label: 'DateTime' },
														{ value: 'select', label: 'Select' }
													]}
												/>
											</Form.Item>

											{/* <Form.Item
												className="w-full"
												{...restField}
												name={[name, 'option']}
												// rules={[{ required: false, message: 'Missing option' }]}
											>
												<Input placeholder="Option" className="w-full" />
											</Form.Item> */}

											<Form.List name="option">
												{(fields, { add, remove }) => {
													// console.log(selectValue)

													if (selectValue === 'select') {
														return (
															<>
																{fields.map(({ key, name, ...restField }) => (
																	<div
																		key={key}
																		style={{ display: 'flex', marginBottom: 8 }}
																		// align="baseline"
																	>
																		<Form.Item
																			{...restField}
																			name={[name, 'first']}
																			rules={[
																				{
																					required: true,
																					message: 'Missing first name'
																				}
																			]}
																		>
																			<Input placeholder="First Name" />
																		</Form.Item>
																		<Form.Item
																			{...restField}
																			name={[name, 'last']}
																			rules={[
																				{
																					required: true,
																					message: 'Missing last name'
																				}
																			]}
																		>
																			<Input placeholder="Last Name" />
																		</Form.Item>
																		<MinusCircleOutlined
																			onClick={() => remove(name)}
																		/>
																	</div>
																))}
																<Form.Item>
																	<Button
																		type="dashed"
																		onClick={() => add()}
																		block
																		icon={<PlusOutlined />}
																	>
																		Add field
																	</Button>
																</Form.Item>
															</>
														)
													} else {
														<Form.Item
															className="w-full"
															{...restField}
															name={[name, 'option']}
															// rules={[{ required: false, message: 'Missing option' }]}
														>
															<Input placeholder="Option" className="w-full" />
														</Form.Item>
													}
												}}
											</Form.List>
										</div>
										<Button type="primary" danger onClick={() => remove(name)}>
											Xoa
										</Button>
									</Space>
								)
							})}
						</div>
					)
				}}
			</Form.List>
			<Button htmlType="submit" type="primary" className="w-full mt-3">
				Submit
			</Button>
		</Form>
	)
}
export default AddCategoryForm
