import { CoreCard } from "@/@App/Core/components"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Space } from "antd"
import TextArea from "antd/es/input/TextArea"

const AddCategoryForm = ()=>{
	const [form] = Form.useForm()
    return (
		<Form
			layout="vertical"
			className="w-full bg-gray-200 p-4"
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 30 }}
			// style={{ width: 600 }}
			initialValues={{ remember: true }}
			// onFinish={onFinish}
			// onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Name"
				name="name"
				rules={[{ required: true, message: 'Please input category filter name!' }]}
			>
				<Input size="large" className="" />
			</Form.Item>

			<Form.Item label="Description" name="description">
				<TextArea />
			</Form.Item>

			<Form.List name="users" >
				{(fields, { add, remove }) => (
					<div className="bg-white p-2">
						<Button type="primary" color="success" onClick={() => add()} style={{ width: '20%', marginBottom: '10px' }} block icon={<PlusOutlined />}>
							Thêm 
						</Button>
                        {fields.map(({ key, name, ...restField }) => (
							<Space  
							key={key} style={{ display: 'flex', alignItems:'center', marginBottom: 8, }} align="baseline">
                                <div 
									className="bg-gray-200 w-[400px] p-2">
                                    <Form.Item className="w-full"
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="First Name" className="w-full" />
                                    </Form.Item>
                                    <Form.Item 
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Select
											placeholder="ValueType"
											// defaultValue=""
											style={{ width: '100%' }}
											// onChange={handleChange}
											options={[
												{ value: 'jack', label: 'Jack' },
												{ value: 'lucy', label: 'Lucy' },
												{ value: 'Yiminghe', label: 'yiminghe' },
												{ value: 'disabled', label: 'Disabled', disabled: true },
											]}
    									/>
                                    </Form.Item>
									<Form.Item className="w-full"
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="First Name" className="w-full" />
                                    </Form.Item>
                                </div>
								<Button type="primary" danger onClick={() => remove(name)}>Xoa</Button>
							</Space>
						))}
					</div>
				)}
			</Form.List>
		</Form>
	)
}
export default AddCategoryForm