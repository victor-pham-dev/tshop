import { useAntdTable } from 'ahooks'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { warehouseBillService } from '../../../services/warehouseBillService'

interface PagingParam {
	current: number
	pageSize: number
}

interface Result {
	total: number
	list: any[]
}

export const useTableBill = () => {
	const { refreshTable, id } = useCorePageContext()

	const getTableData = async ({ current, pageSize }: PagingParam, formData: Object): Promise<Result> => {
		const data = await warehouseBillService.search({
			params: { warehouseItemId: id, page: current, pageSize: pageSize, ...formData }
		})

		return {
			list: data?.data?.dataTable ?? [],
			total: data?.data?.totalCount
		}
	}
	const { tableProps } = useAntdTable(getTableData, { refreshDeps: [refreshTable] })
	return { tableProps }
}
