import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { Button, Table, message } from 'antd'
import { useTableListCategoryFilter } from '../hooks/useTableListCategoryFilter'
import moment from 'moment'
import { FilterProps, useDetailFilterModal } from '../hooks/useDetailFilterModal'
import { DeleteAction, EditAction } from '@/@App/Core/components/action'
import { systemCategoryFilterService } from '@/@App/Pages/System/services/systemCategoryFilterService'
import { useRouter } from 'next/router'
import { SYSTEM_ROUTER } from '@/@App/Pages/System/configs/router'

export interface CategoryFilterEntity {
	id: number
	description: string
	filters: FilterProps[]
}

const TableListCategoryFilter = () => {
	const router = useRouter()
	const { tableProps } = useTableListCategoryFilter()
	const { handleCloseDetailFilterModal, handleOpenDetailFilterModal, renderDetailFilterModal } =
		useDetailFilterModal()

	const { triggerRefresh } = useCorePageContext()

	const handleDeleteCategoryFilter = async (id: number) => {
		try {
			const result = await systemCategoryFilterService.remove(String(id))
			message.success(result?.message)
			triggerRefresh()
		} catch (error: any) {
			message.error(error?.message)
		}
	}

	const columns = [
		{ title: 'ID', dataIndex: 'id', key: 'id' },
		{
			title: 'Tên bộ lọc',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description'
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (data: Date) => <>{moment(data).format('HH:mm:ss - DD/MM/YYYY')}</>
		},
		{
			title: 'Ngày cập nhật',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (data: Date) => <>{moment(data).format('HH:mm:ss - DD/MM/YYYY')}</>
		},
		{
			title: 'Chi tiết bộ lọc',
			dataIndex: 'filters',
			render: (data: FilterProps[]) => (
				<Button type="primary" onClick={() => handleOpenDetailFilterModal(data)}>
					Xem chi tiết
				</Button>
			)
		},
		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: CategoryFilterEntity) => {
				return (
					<div className="flex items-center gap-2">
						<EditAction action={() => router.push(SYSTEM_ROUTER.CATEGORY_FILTER_DETAIL(String(data.id)))} />
						<DeleteAction action={() => handleDeleteCategoryFilter(data.id)} />
					</div>
				)
			}
		}
	]
	return (
		<>
			<Table columns={columns} {...tableProps} />
			{renderDetailFilterModal()}
		</>
	)
}
export default TableListCategoryFilter
