import { useCorePageContext } from "@/@App/Core/hooks/useAppContext";
import React from "react";


import { Col, Divider, Form, FormInstance, Input, Row, Spin, List, Button } from "antd";
import dynamic from "next/dynamic";
import { useFormDetail } from "../hooks/useFormDetail";
import { CoreCard } from "@/@App/Core/components";
import FileUpLoad from "@/@App/Core/components/input/FileUpload";
import BasicInfo from "./Basic";
import ProductCategoryAndProperties from "./ProductCategoryProperties";
import { PlusOutlined } from "@ant-design/icons";
import clsx from "clsx";


const InputRichText = dynamic(() => import('@/@App/Core/components/input/InputRichText'),{
	ssr:false,
	loading: () =>(
		<div className="w-full">
			<Spin/>
		</div>
	)
})

const { TextArea } = Input

const FormDetail = () => {

	const [form] = Form.useForm()
	const { product, id } = useCorePageContext()
	console.log("product9", product)

	const initImage = (product?.image ? JSON.parse(product?.image): []) as string[]

	const { getFieldError, getFieldsValue } = form

	const { loadingSaveProduct, saveProduct } = useFormDetail(id)

	return(
		<>
			<div>
				<Divider className="textTheme">{id ==='new' ? 'add product' : product?.name}</Divider>
				<Form
					form={form}
					name="newPost"
					labelCol={{span:24}}
					wrapperCol={{span:24}}
					onFinish={value => {
						console.log("value24", value)

						saveProduct({...value, overView: value?.overView?.map((item:any) => item?.name)})
					}}
					autoComplete="off"
					initialValues={{
						...product,
						images: initImage,
						overView: product?.overView
							? JSON.parse(product?.overView)?.map((item:any) =>({name:item})) 
							:[],
						active: product?.active ?? true
					}}
				>
						<CoreCard className="my-5">
							<FileUpLoad
								formName="images"
								label={'image product'}
								initValue={initImage}
								maxItem={10}
								form={form}
							/>
						</CoreCard>
					
						<Row gutter={[16,16]}>
							<Col xxl={12}>
									<BasicInfo/>
							</Col>
							<Col xxl={12}>
								<ProductCategoryAndProperties form={form}/>
							</Col>
							<Col xxl={12}>
								<CoreCard>
									<Form.List name='overView'>
										{(fields, {add, remove }) => (
											<>
												<div className="flex items-baseline gap-4">
													<span className="text-[100px] py-4 font-600 text-blue-500">
														Thông tin tổng quan
													</span>
													<Form.Item>
														<Button
															type="primary"
															onClick={() => add()}
															icon={<PlusOutlined/>}
														>
															Thêm
														</Button>
													</Form.Item>
												</div>

												<div className="h-[362px] flex-col gap-4 overflow-y-scroll p-4 bg-gray-100 rounded-md">
													{
														fields?.length === 0 && (
															<p 
																className={clsx('text-center', {
																	'text-red-500': getFieldError('overView')
																})}
															>
																Chưa có thông tin nào!
															</p>
														)
													}
													{
														fields?.map(({key, name, ...restFields}) => (
															<div key={name} className="flex justify-between gap-4">
																<Form.Item
																	{...restFields}
																	name={[name,'name']}
																	rules={[
																		{
																			required:true,
																			message: 'Vui lòng điền thông tin'
																		}
																	]}
																	className="w-full"
																>
																	<Input style={{ width:'100%'}} placeholder="Nhập thông tin"/>
																</Form.Item>

																<Button type="primary" danger onClick={() => remove(name)}>
																	Xoá
																</Button>
															</div>
														))
													}
												</div>
											</>
										)}
									</Form.List>
								</CoreCard>
							</Col>

							<Col span={24}>
								<Form.Item 
										name='description'
										label={<label className="textTheme"> Nội dung mô tả sản phẩm</label>}
										rules={[
											{
												required:true,
												message:'Nội dung không được để trống'
											},
											{
												min:8,
												message:"Nội dung không được để trống"
											}
										]}
								>
									<InputRichText form={form} name="description"/>
								</Form.Item>
							</Col>
						</Row>

						<Form.Item wrapperCol={{span:24}}>
							<Button loading={loadingSaveProduct} block type="primary" htmlType="submit">
								{
									product?.id ? 'Sửa sản phẩm' : 'Tạo sản phẩm'
								}
							</Button>
						</Form.Item>
				</Form>
			</div>
		</>
	)
}

export default FormDetail


