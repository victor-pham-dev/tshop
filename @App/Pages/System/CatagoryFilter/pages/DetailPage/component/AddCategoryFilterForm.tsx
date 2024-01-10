import { CoreCard } from '@/@App/Core/components'
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Select, Space } from 'antd'

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
				filters: [{ label: '', valueType: '', option: '' }]
			}}
		>
			<Form.Item
				label="Name :"
				name="name"
				rules={[{ required: true, message: 'Please input category filter name!' }]}
			>
				<Input size="large" className="" />
			</Form.Item>

			<Form.Item label="Description :" name="description">
				<Input.TextArea />
			</Form.Item>
			<Form.Item label="Filters :">
				<Form.List name="filters">
					{(fields, { add, remove }) => (
						<div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
							<Button
								type="primary"
								color="success"
								onClick={() => add()}
								style={{ width: '30%', marginBottom: '10px' }}
								block
							>
								+ Add Item
							</Button>
							{fields.map(field => (
								<div className='flex justify-between items-center'>
									<Card

										size='small'
										className='w-[84%]'
										title={`Filter ${field.name + 1}`}
										key={field.key}
									>
										<Form.Item
											name={[field.name, 'label']}
											rules={[{ required: true, message: 'Missing Value Type' }]}
										>
											<Input placeholder="Label" />
										</Form.Item>
										<Form.Item
											name={[field.name, 'valueType']}
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

										{/* Nest Form.List */}
										<Form.Item label="Option :" className=''>
											<Form.List name={[field.name, 'option']}>
												{(subFields, subOpt) => (
													<div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
														{subFields.map(subField => (
															<Space key={subField.key}>
																<Form.Item noStyle name={[subField.name, 'first']}>
																	<Input placeholder="first" />
																</Form.Item>
																<CloseOutlined
																	onClick={() => {
																		subOpt.remove(subField.name)
																	}}
																/>
															</Space>
														))}
														<Button type="dashed" onClick={() => subOpt.add()} block>
															+ Add Sub Item
														</Button>
													</div>
												)}
											</Form.List>
										{/* <CloseOutlined onClick={() => {remove(field.name)}}/> */}
										</Form.Item>
									</Card>
									<Button type="primary" danger onClick={() => remove(field.name)}>
											Xoa
										</Button>
								</div>
							))}
							
						</div>
					)}
				</Form.List>
				
			</Form.Item>
			<Button htmlType="submit" type="primary" className="w-full mt-3">
				Submit
			</Button>
		</Form>
	)
}
export default AddCategoryForm
