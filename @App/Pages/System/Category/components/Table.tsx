import { Button, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'

import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { EditAction, ViewAction } from '@/@App/Core/components/action'
import { useViewCategoryModal } from '../hooks/useViewCategoryModal'
import { useCategoryFormModal } from '../hooks/useCategoryFormModal'

export default () => {
	const router = useRouter()
	const { tableProps } = useTable()

	const { handleCloseAddCategoryModal, handleOpenAddCategoryModal, renderAddCategoryModal } = useCorePageContext()
	const { handleCloseDetailModal, renderDetailModal, handleOpenDetailModal } = useViewCategoryModal()

	// const { type, changeType, submit, reset } = search

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Tên Danh mục',
			dataIndex: 'label'
		},
		{
			title: 'Alias',
			dataIndex: 'alias'
		},
		{
			title: 'Status',
			dataIndex: 'active',
			render: (data: boolean) => <Tag color={data ? 'green' : 'red'}> {data ? 'Active' : 'OFF'}</Tag>
		},
		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: any) => {
				return (
					<div className="flex gap-2">
						<ViewAction action={() => handleOpenDetailModal(data?.id)} />
						<EditAction action={() => handleOpenAddCategoryModal(data?.id)} />
					</div>
				)
			}
		}
	]
	return (
		<>
			<Button onClick={() => handleOpenAddCategoryModal('new')} type="primary" className="mb-2 w-max">
				Thêm mới danh mục lớn
			</Button>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderDetailModal()}
			{renderAddCategoryModal()}
		</>
	)
}
