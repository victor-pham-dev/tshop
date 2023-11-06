import { Form, Input, Switch, Button } from 'antd'
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useCategoryFormDetail } from '../hooks/useCategoryFormDetail'
import clsx from 'clsx'

export const CategoryFromDetail = (props: any) => {
	const {
		data: { data }
	} = props
	console.log('🚀 ~ file: CategoryFromDetail.tsx:8 ~ CategoryFromDetail ~ data:', data)
	const [form] = Form.useForm()

	const { loadingSubmit, onSubmit } = useCategoryFormDetail()

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
				label: data?.label,
				alias: data?.alias,
				active: data?.active,
				description: data?.description,
				children: data?.children ?? []
			}}
		>
			<div className="grid w-full grid-cols-1 gap-20 md:grid-cols-2">
				<div className="p-4 bg-gray-100 rounded-md ">
					<Form.Item name="id">
						<Input className="hidden" />
					</Form.Item>
					<Form.Item
						name="label"
						label={<label className="textTheme">Tên danh mục</label>}
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
						name="alias"
						label={<label className="textTheme">Alias</label>}
						rules={[
							{
								required: true,
								message: 'Vui lòng điền!'
							}
						]}
					>
						<Input placeholder="Alias" />
					</Form.Item>
					<Form.Item name="icon" label={<label className="textTheme">Icon Link</label>}>
						<Input />
					</Form.Item>
					<Form.Item name="description" label={<label className="textTheme">Mô tả</label>}>
						<Input.TextArea />
					</Form.Item>

					<Form.Item valuePropName="active" label={<label className="textTheme">Hiển thị</label>}>
						<Switch defaultChecked={data?.active} />
					</Form.Item>
				</div>
				<div className="p-4 bg-blue-100 rounded-md h-[80vh] overflow-y-scroll">
					<span>Danh mục con</span>
					<Form.List name="children">
						{(fields, { add, remove }) => (
							<>
								<div className="flex items-baseline gap-4 ">
									<Form.Item>
										<Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
											Thêm
										</Button>
									</Form.Item>
								</div>

								<div className="flex-col p-4 rounded-md">
									{fields.map(({ key, name, ...restField }) => {
										return (
											<div key={name} className="flex flex-col p-4 my-12 bg-white">
												<Form.Item
													{...restField}
													name={[name, 'label']}
													label={<label className="textTheme">Tên danh mục</label>}
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
													{...restField}
													name={[name, 'alias']}
													label={<label className="textTheme">Alias</label>}
													rules={[
														{
															required: true,
															message: 'Vui lòng điền!'
														}
													]}
												>
													<Input placeholder="Alias" />
												</Form.Item>
												<Form.Item
													{...restField}
													name={[name, 'icon']}
													label={<label className="textTheme">Icon Link</label>}
												>
													<Input />
												</Form.Item>
												<Form.Item
													{...restField}
													name={[name, 'description']}
													label={<label className="textTheme">Mô tả</label>}
												>
													<Input.TextArea />
												</Form.Item>

												<Form.Item
													name={[name, 'active']}
													label={<label className="textTheme">Hiển thị</label>}
												>
													<Switch defaultChecked={data?.children[key]?.active} />
												</Form.Item>
												<Button type="primary" danger onClick={() => remove(name)}>
													Xoá
												</Button>
											</div>
										)
									})}
								</div>
							</>
						)}
					</Form.List>
				</div>
				<Form.Item wrapperCol={{ span: 24 }}>
					<Button loading={loadingSubmit} block type="primary" htmlType="submit">
						{data?.id ? 'Sửa ' : 'Tạo '}
					</Button>
				</Form.Item>
			</div>
		</Form>
	)
}
