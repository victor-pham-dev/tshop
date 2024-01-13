import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	FormInstance,
	Input,
	InputNumber,
	Row,
	Select,
	Spin,
	Switch
} from 'antd'
import { productCategoryOptions, productStatusOptions } from '@/const/app-const'
import { GiftOutlined, PlusOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import { CoreCard, CoreSelectWithApi, CoreTreeSelectWithApi, FileUpload } from '@/@App/Core/components'
import clsx from 'clsx'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { useFormDetail } from '../hooks/useFormDetail'
import { systemCategoryService } from '@/@App/Pages/System/services/systemCategoryService'
import { memo, useMemo } from 'react'
import { useRequest, useUpdateEffect } from 'ahooks'
const InputRichText = dynamic(() => import('@/@App/Core/components/input/InputRichText'), {
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
	const { product, id } = useCorePageContext()
	console.log('🚀 ~ file: Form.tsx:23 ~ FormDetail ~ product:', product)

	const initImages = (product?.images ? JSON.parse(product?.images) : []) as string[]

	const { getFieldError, getFieldsValue } = form
	const { loadingSaveProduct, saveProduct } = useFormDetail(id)

	return (
		<div>
			<Divider className="textTheme"> {id === 'new' ? 'Thêm sản phẩm' : product?.name}</Divider>
			<Form
				form={form}
				name="newPost"
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				onFinish={values => {
					console.log('🚀 ~ FormDetail ~ values:', values)

					saveProduct({ ...values, overView: values?.overView?.map((item: any) => item.name) })
				}}
				autoComplete="off"
				initialValues={{
					id: id !== 'new' ? Number(id) : null,
					images: initImages,
					name: product?.name,
					status: product?.status,
					category: product?.category,
					price: product?.price,
					salePrice: product?.salePrice,
					description: product?.description,
					configInfo: product?.configInfo,
					seo: product?.seo,
					keywords: product?.keywords,
					overView: product?.overView
						? JSON.parse(product?.overView)?.map((item: any) => ({ name: item }))
						: [],
					active: product?.active ?? true
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
						<BasicInfo />
					</Col>
					<Col xxl={12}>
						<ProductCategoryAndProperties form={form} />
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
												<Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
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
														<Input style={{ width: '100%' }} placeholder="Nhập thông tin" />
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
					<Form.Item valuePropName="active" name="active" label="Bật tắt Hiển thị">
						<Switch defaultChecked={product?.active ?? true} />
					</Form.Item>
				</Row>

				<Form.Item wrapperCol={{ span: 24 }}>
					<Button loading={loadingSaveProduct} block type="primary" htmlType="submit">
						{product?.id ? 'Sửa sản phẩm' : 'Tạo sản phẩm'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default FormDetail

export const BasicInfo = () => {
	return (
		<CoreCard>
			<p style={{ width: '100%' }} className="text-[16px] py-4 font-600 text-blue-500">
				Thông tin cơ bản
			</p>
			<div className="p-4 bg-gray-100">
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
					<Select placeholder="Tình trạng sản phẩm" allowClear options={productStatusOptions} />
				</Form.Item>

				<Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Giá đâu' }]}>
					<InputNumber
						style={{ width: '100%' }}
						placeholder="Giá"
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				</Form.Item>
				<Form.Item
					name="salePrice"
					label="Giá đã giảm"
					rules={[{ required: true, message: 'Giá đã giảm đâu' }]}
				>
					<InputNumber
						style={{ width: '100%' }}
						placeholder="Giá sau giảm"
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
					<TextArea />
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
	)
}

interface ProductCategoryAndPropertiesProps {
	form: FormInstance<any>
}

const ProductCategoryAndProperties: React.FC<ProductCategoryAndPropertiesProps> = memo(({ form }) => {
	const categoryId = Form.useWatch('categoryId', form)

	const {
		data: detailCategory,
		loading: loadingDetailCategory,
		run: getDetailCategory
	} = useRequest(systemCategoryService.find, { manual: true })
	console.log(
		'🚀 ~ constProductCategoryAndProperties:React.FC<ProductCategoryAndPropertiesProps>=memo ~ detailCategory:',
		detailCategory
	)

	useUpdateEffect(() => {
		if (categoryId) {
			getDetailCategory(categoryId)
		}
	}, [categoryId])

	const filters = useMemo(() => {
		if (detailCategory) {
			return detailCategory?.data?.CategoryFilters?.filters
		}
		return []
	}, [JSON.stringify(detailCategory)])

	const renderPropertiesInput = () => {
		if (filters.length === 0) {
			return null
		}

		return filters.map((item: any) => (
			<Form.Item
				label={item?.label}
				name={['properties', item?.label]}
				rules={[
					{
						required: item.required,
						message: 'Vui lòng nhập / chọn giá trị'
					}
				]}
			>
				{item?.valueType === 'SELECT' ? (
					<Select
						size="large"
						placeholder="Chọn"
						options={item.options.map((item: any) => ({ ...item, label: item.value }))}
					/>
				) : item?.valueType === 'NUMBER' ? (
					<InputNumber
						size="large"
						className="min-w-[240px]"
						placeholder="Nhập giá trị"
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				) : item?.valueType === 'STRING' ? (
					<Input size="large" placeholder="Vui lòng điền" />
				) : (
					<DatePicker size="large" placeholder="Chọn thời gian" />
				)}
			</Form.Item>
		))
	}

	return (
		<CoreCard>
			<h3 className="text-blue-500">Danh mục & thuộc tính cấu hình sản phẩm</h3>
			<Form.Item label="Chọn danh mục cho sản phẩm" name="categoryId">
				<CoreTreeSelectWithApi
					size="large"
					valueField="id"
					titleField="label"
					childrenField="children"
					dataPath="data"
					apiService={systemCategoryService.getAllWithChildren}
					customRender={(option: any) => option?.label}
				/>
			</Form.Item>
			{renderPropertiesInput()}
		</CoreCard>
	)
})
