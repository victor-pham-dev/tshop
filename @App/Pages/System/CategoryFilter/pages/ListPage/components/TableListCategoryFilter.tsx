import { useCorePageContext } from "@/@App/Core/hooks/useAppContext";
import { DetailCategoryFilter, useDetailCategoryFilterModal } from "../hooks/useDetailCategoryFilterModal";
import { useTableListCategoryFilter } from "../hooks/useTableListCategoryFilter";
import { systemDetailCategoryFilterService } from "@/@App/Pages/System/services/systemCategoryFilterService";
import { SYSTEM_ROUTER } from "@/@App/Pages/System/configs/router";
import { DeleteAction, EditAction } from "@/@App/Core/components/action";

import { Table, Button, message } from "antd";

import { useRouter } from "next/router";

import moment from "moment";

export interface CategoryFilterEntity {
	id: number;
	description: string
	filters : DetailCategoryFilter[]
	
}

const TableListCategoryFilter = () =>{

	const router = useRouter()
	const { tableProps } = useTableListCategoryFilter()
	console.log(tableProps)
   	const { handleCloseDetailFilterModal, handleOpenDetailFilterModal, renderDetailFilterModal } =
		useDetailCategoryFilterModal()

	const { triggerRefresh } = useCorePageContext()

	const handleDeleteCategoryFilter = async (id: number) => {
		try {
			const results = await systemDetailCategoryFilterService.remove(String(id))
			message.success(results?.message)
			triggerRefresh()
		} catch (error: any ) {
			message.error(error?.message)
		}
	}

   const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Describe',
			dataIndex: 'description',
			key: 'description'
		},
		{
			title: 'Date created',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render:(data:Date) => <>{moment(data).format('HH:mm:ss - DD/MM/YYYY')}</>

		},
		{
			title: 'Update day',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render:(data:Date) => <>{moment(data).format('HH:mm:ss - DD/MM/YYYY')}</>
			
		},
		{
			title: 'Filter Details',
			dataIndex: 'filters',
			render:(
				data: DetailCategoryFilter[]
			) => (
				<Button 
				type="primary"
				onClick={() => handleOpenDetailFilterModal(data)}
				>
					Xem chi tiết
				</Button>
			)
		},
		{
			title: 'Act',
			dataIndex: '',
			render:(
				data: CategoryFilterEntity
			) => {
				return(
					<div className="flex items-center gap-2">
						<EditAction action={() => router.push(SYSTEM_ROUTER.CATEGORY_FILTER_DETAIL(String(data?.id)))}/>
						<DeleteAction action={() => handleDeleteCategoryFilter(data?.id)}/>
					</div>
				)
			}
		}
	]
	return(
        <>
            <Table columns={columns} {...tableProps}></Table>
			{renderDetailFilterModal()}
        </> 
    )
 
}

export default TableListCategoryFilter