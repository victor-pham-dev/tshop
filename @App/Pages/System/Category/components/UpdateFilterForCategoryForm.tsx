import { CoreSelectWithApi } from '@/@App/Core/components'
import { Button, Form, Switch, message } from 'antd'
import React from 'react'
import { systemCategoryFilterService } from '../../services/systemCategoryFilterService'
import { useRequest } from 'ahooks'
import { systemCategoryService } from '../../services/systemCategoryService'

interface UpdateFilterForCategoryProps {
	actionAfterSubmit: () => void
	data: any
}
const UpdateFilterForCategory: React.FC<UpdateFilterForCategoryProps> = props => {
	const { data, actionAfterSubmit } = props
	console.log('🚀 ~ file: UpdateFilterForCategoryForm.tsx:12 ~ data:', data)
	const [form] = Form.useForm()

	const { loading: loadingSubmit, run: handleSubmit } = useRequest(systemCategoryService.updateFilterForCategory, {
		manual: true,
		onSuccess: (data: any) => {
			message.success(data?.message)
			actionAfterSubmit()
		},
		onError: (error: any) => {
			message.error(error?.message)
		}
	})

	return (
		<Form
			className="p-4 my-4 bg-white rounded-lg shadow-xl"
			form={form}
			initialValues={{
				categoryId: data?.id,
				categoryFilterId: data?.categoryFiltersId,
				applyForChildren: true
			}}
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			onFinish={handleSubmit}
		>
			<Form.Item name="categoryId" hidden></Form.Item>

			<Form.Item
				label="Bộ lọc"
				name="categoryFilterId"
				required
				rules={[{ required: true, message: 'Vui lòng chọn bộ lọc' }]}
			>
				<CoreSelectWithApi
					size="large"
					apiService={systemCategoryFilterService.search}
					customRender={(option: any) => option?.name}
				/>
			</Form.Item>
			<Form.Item label="Áp dụng cho tất cả danh mục con" name="applyForChildren" valuePropName="checked">
				<Switch />
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }}>
				<Button loading={loadingSubmit} block type="primary" htmlType="submit">
					Cập nhật
				</Button>
			</Form.Item>
		</Form>
	)
}

export default UpdateFilterForCategory
