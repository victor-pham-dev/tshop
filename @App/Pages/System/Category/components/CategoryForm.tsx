import { Form, Input, Switch, Button, message } from 'antd'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { useRequest, useUpdateEffect } from 'ahooks'
import { systemCategoryService } from '../../services/systemCategoryService'
import { useCallback } from 'react'

const CategoryForm = (props: any) => {
	const { data } = props

	const [form] = Form.useForm()

	useUpdateEffect(() => {
		if (data) {
			form.setFieldsValue({ ...data })
		} else {
			form.resetFields()
		}
	}, [JSON.stringify(data)])

	const { triggerRefresh, handleCloseAddCategoryModal } = useCorePageContext()

	const { loading: loadingSubmit, run: onSubmit } = useRequest(systemCategoryService.save, {
		manual: true,
		onSuccess: data => {
			message.success(data?.message)
			triggerRefresh()
			handleCloseAddCategoryModal()
			if (props?.actionAfterSubmit) {
				props?.actionAfterSubmit()
			}
		},
		onError: error => {
			message.error(error?.message)
		}
	})

	return (
		<Form
			form={form}
			name="newPost"
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={onSubmit}
			autoComplete="off"
			initialValues={{
				id: data?.id ?? null,
				label: data?.label ?? '',
				alias: data?.alias ?? '',
				icon: data?.icon ?? '',
				description: data?.description ?? '',
				active: data?.active ?? true,
				parentId: data?.parentId ?? 0
			}}
		>
			<Form.Item name="id" className="hidden"></Form.Item>
			<Form.Item name="parentId" className="hidden"></Form.Item>
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

			<Form.Item name="icon" label={<label className="textTheme">Icon Link</label>}>
				<Input />
			</Form.Item>
			<Form.Item name="description" label={<label className="textTheme">Mô tả</label>}>
				<Input.TextArea />
			</Form.Item>

			<Form.Item valuePropName="checked" name="active" label={<label className="textTheme">Hiển thị</label>}>
				<Switch />
			</Form.Item>

			<Form.Item wrapperCol={{ span: 24 }}>
				<Button loading={loadingSubmit} block type="primary" htmlType="submit">
					Xác nhận
				</Button>
			</Form.Item>
		</Form>
	)
}

export default CategoryForm
