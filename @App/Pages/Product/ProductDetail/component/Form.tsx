import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Spin } from 'antd'
import { productCategoryOptions, productStatusOptions } from '@/const/app-const'
import { GiftOutlined, PlusOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import { CoreCard, FileUpload } from '@/@App/@Core/components'
import clsx from 'clsx'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { useFormDetail } from '../hooks/useFormDetail'
const InputRichText = dynamic(() => import('@/@App/@Core/components/input/InputRichText'), {
	ssr: false,
	loading: () => (
		<div className="w-full">
			<Spin />
		</div>
	)
})

const { TextArea } = Input

const FormDetail = () => {
	const [form] = Form.useForm()
	const { product, id } = useCoreContext()

	const initImages = (product?.images ? JSON.parse(product?.images) : []) as string[]

	const { getFieldError, getFieldsValue } = form
	const { loadingSaveProduct, saveProduct } = useFormDetail(id)

	return (
		<div>
			<Divider className="textTheme"> {id === 'new' ? 'Thêm sản phẩm' : product?.name}</Divider>
			{id && (
				<Form
					form={form}
					name="newPost"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					onFinish={values => {
						saveProduct({ ...values, overView: values?.overView?.map((item: any) => item.name) })
					}}
					autoComplete="off"
					initialValues={{
						id: id !== 'new' && id,
						images: initImages,
						name: product?.name,
						status: product?.status,
						category: product?.category,
						classifications: product?.classifications,
						description: product?.description
					}}
				>
					<CoreCard className="my-5">
						<FileUpload
							formName="images"
							label={'Ảnh sản phẩm'}
							initValue={initImages}
							maxItem={10}
							form={form}
						/>
					</CoreCard>

					<Row gutter={[16, 16]}>
						<Col xxl={12}>
							<CoreCard>
								<p style={{ width: '100%' }} className="text-[16px] py-4 font-600 text-blue-500">
									Thông tin cơ bản
								</p>
								<div className="p-4 bg-gray-100">
									{' '}
									<Form.Item className="hidden" name="id"></Form.Item>
									<Form.Item
										name="name"
										label={<label className="textTheme">Tên sản phẩm</label>}
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											}
										]}
									>
										<Input placeholder="Tên sản phẩm" />
									</Form.Item>
									<Form.Item
										name="status"
										label={<label className="textTheme">Tình trạng sản phẩm</label>}
										rules={[
											{
												required: true,
												message: 'Vui lòng chọn tình trạng!'
											}
										]}
									>
										<Select
											placeholder="Tình trạng sản phẩm"
											allowClear
											options={productStatusOptions}
										/>
									</Form.Item>
									<Form.Item
										name="category"
										label={<label className="textTheme">Danh mục sản phẩm</label>}
										rules={[
											{
												required: true,
												message: 'Vui lòng chọn danh mục!'
											}
										]}
									>
										<Select
											placeholder="danh mục sản phẩm"
											allowClear
											options={productCategoryOptions}
										/>
									</Form.Item>
									<Form.Item
										name="seo"
										label="Nội dung SEO"
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											},
											{
												max: 120,
												message: 'Tối đa 120 kí tự'
											}
										]}
									>
										<TextArea placeholder="Tên sản phẩm" />
									</Form.Item>
									<Form.Item
										name="keywords"
										label="Từ khoá SEO"
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											},
											{
												max: 120,
												message: 'Tối đa 120 kí tự'
											}
										]}
									>
										<TextArea placeholder="Từ khoá SEO, cách nhau bởi dấu phảy" />
									</Form.Item>
								</div>
							</CoreCard>
						</Col>

						<Col xxl={12}>
							<CoreCard>
								<Form.List name="classifications">
									{(fields, { add, remove }) => (
										<>
											<div className="flex items-baseline gap-4">
												<span className="text-[16px] py-4 font-600 text-blue-500">
													Phân loại sản phẩm ({fields.length})
												</span>
												<Form.Item>
													<Button
														type="primary"
														onClick={() => add()}
														icon={<PlusOutlined />}
													>
														Thêm phân loại
													</Button>
												</Form.Item>
											</div>

											<div className="h-[426px] overflow-y-scroll p-4 bg-gray-100 rounded-md">
												{fields.length === 0 && (
													<p
														className={clsx('text-center', {
															'text-red-500': getFieldError('classifications')
														})}
													>
														Chưa có phân loại nào!
													</p>
												)}
												{fields.map(({ key, name, ...restField }) => (
													<Row align="middle" key={key} gutter={[16, 0]}>
														<Col span={20}>
															<p className="py-2 textTheme ">Phân loại {key + 1}</p>
															{/* <Form.Item
															{...restField}
															name={[name, 'image']}
															rules={[{ required: true, message: 'Link ảnh đâu ?' }]}
														>
															<Input style={{ width: '100%' }} placeholder="Link ảnh" />
														</Form.Item> */}
															<Form.Item
																{...restField}
																name={[name, 'name']}
																label="Tên phân loại"
																rules={[
																	{ required: true, message: 'Tên phân loại đâu ?' }
																]}
															>
																<Input
																	style={{ width: '100%' }}
																	placeholder="Tên phân loại"
																/>
															</Form.Item>
															<Form.Item
																{...restField}
																name={[name, 'price']}
																label="Giá"
																rules={[{ required: true, message: 'Giá đâu' }]}
															>
																<InputNumber
																	style={{ width: '100%' }}
																	placeholder="Giá"
																	formatter={value =>
																		`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
																	}
																/>
															</Form.Item>
															<Form.Item
																{...restField}
																name={[name, 'warrantyTime']}
																label="Thời gian bảo hành"
																rules={[
																	{
																		required: true,
																		message: 'Thời gian bảo hành đâu'
																	}
																]}
															>
																<InputNumber
																	style={{ width: '100%' }}
																	placeholder="Số ngày bảo hành"
																	min={0}
																	formatter={value =>
																		`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
																	}
																/>
															</Form.Item>
														</Col>
														<Col span={4}>
															<Button danger type="primary" onClick={() => remove(name)}>
																Xoá
															</Button>
														</Col>
														<Divider></Divider>
													</Row>
												))}
											</div>
										</>
									)}
								</Form.List>
							</CoreCard>
						</Col>

						<Col xxl={12}>
							<CoreCard>
								<Form.List name="overView">
									{(fields, { add, remove }) => (
										<>
											<div className="flex items-baseline gap-4">
												<span className="text-[16px] py-4 font-600 text-blue-500">
													Thông tin tổng quan
												</span>
												<Form.Item>
													<Button
														type="primary"
														onClick={() => add()}
														icon={<PlusOutlined />}
													>
														Thêm
													</Button>
												</Form.Item>
											</div>

											<div className="h-[362px] flex-col gap-4 overflow-y-scroll p-4 bg-gray-100 rounded-md">
												{fields.length === 0 && (
													<p
														className={clsx('text-center', {
															'text-red-500': getFieldError('overView')
														})}
													>
														Chưa có thông tin nào!
													</p>
												)}
												{fields.map(({ key, name, ...restField }) => (
													<div key={name} className="flex justify-between gap-4">
														<Form.Item
															{...restField}
															name={[name, 'name']}
															rules={[{ required: true, message: 'Vui lòng điền ' }]}
															className="w-full"
														>
															<Input
																style={{ width: '100%' }}
																placeholder="Nhập thông tin"
															/>
														</Form.Item>

														<Button type="primary" danger onClick={() => remove(name)}>
															Xoá
														</Button>
													</div>
												))}
											</div>
										</>
									)}
								</Form.List>
							</CoreCard>
						</Col>
						<Col xxl={12}>
							<CoreCard>
								<Form.List name="configInfo">
									{(fields, { add, remove }) => (
										<>
											<div className="flex items-baseline gap-4">
												<span className="text-[16px] py-4 font-600 text-blue-500">
													Thông số sản phẩm
												</span>
												<Form.Item>
													<Button
														type="primary"
														onClick={() => add()}
														icon={<PlusOutlined />}
													>
														Thêm
													</Button>
												</Form.Item>
											</div>

											<div className="h-[362px] flex-col gap-4 overflow-y-scroll p-4 bg-gray-100 rounded-md">
												{fields.length === 0 && (
													<p
														className={clsx('text-center', {
															'text-red-500': getFieldError('configInfo')
														})}
													>
														Chưa có thông tin cấu hình nào!
													</p>
												)}
												{fields.map(({ key, name, ...restField }) => (
													<div key={name} className="flex justify-between gap-4">
														<Form.Item
															{...restField}
															name={[name, 'label']}
															rules={[{ required: true, message: 'Vui lòng điền ' }]}
															className="w-1/3"
														>
															<Input
																style={{ width: '100%' }}
																placeholder="Tên thông số"
															/>
														</Form.Item>
														<Form.Item
															{...restField}
															name={[name, 'value']}
															rules={[{ required: true, message: 'Vui lòng điền ' }]}
															className="w-full"
														>
															<TextArea style={{ width: '100%' }} placeholder="Giá trị" />
														</Form.Item>
														<Button type="primary" danger onClick={() => remove(name)}>
															Xoá
														</Button>
													</div>
												))}
											</div>
										</>
									)}
								</Form.List>
							</CoreCard>
						</Col>
						<Col xxl={12}>
							<CoreCard>
								<Form.List name="promotions">
									{(fields, { add, remove }) => (
										<>
											<div className="flex items-baseline gap-4">
												<span className="text-[16px] py-4 font-600 text-blue-500">
													<GiftOutlined className="mx-2 text-red-500 text-[24px]" />
													Thông tin khuyến mãi
												</span>
												<Form.Item>
													<Button
														type="primary"
														onClick={() => add()}
														icon={<PlusOutlined />}
													>
														Thêm
													</Button>
												</Form.Item>
											</div>

											<div className="h-[200px] flex-col gap-4 overflow-y-scroll p-4 bg-gray-100 rounded-md">
												{fields.length === 0 && (
													<p
														className={clsx('text-center', {
															'text-orange-500': getFieldError('promotions')
														})}
													>
														Chưa có khuyến mãi nào!
													</p>
												)}
												{fields.map(({ key, name, ...restField }) => (
													<div className="flex justify-between gap-4">
														<Form.Item
															{...restField}
															name={[name, 'name']}
															rules={[{ required: true, message: 'Vui lòng điền ' }]}
															className="w-full"
														>
															<Input
																style={{ width: '100%' }}
																placeholder="Nhập thông tin khuyến mãi"
															/>
														</Form.Item>

														<Button type="primary" danger onClick={() => remove(name)}>
															Xoá
														</Button>
													</div>
												))}
											</div>
										</>
									)}
								</Form.List>
							</CoreCard>
						</Col>

						<Col span={24}>
							<Form.Item
								name="description"
								label={<label className="textTheme">Nôi dung mô tả sản phẩm</label>}
								rules={[
									{
										required: true,
										message: 'Nội dung không được để trống!'
									},
									{ min: 8, message: 'Nội dung không được để trống!' }
								]}
							>
								<InputRichText form={form} name="description" />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item wrapperCol={{ span: 24 }}>
						<Button loading={loadingSaveProduct} block type="primary" htmlType="submit">
							{product?.id ? 'Sửa sản phẩm' : 'Tạo sản phẩm'}
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	)
}

export default FormDetail
