import { useAntdTable } from 'ahooks'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { warehouseService } from '../../../services/warehouseService'

interface PagingParam {
	current: number
	pageSize: number
}

interface Result {
	total: number
	list: any[]
}

export const useTable = () => {
	const { refreshTable, trigger } = useCorePageContext()

	const getTableData = async ({ current, pageSize }: PagingParam, formData: Object): Promise<Result> => {
		const data = await warehouseService.search({ params: { page: current, pageSize: pageSize, ...formData } })

		return {
			list: data?.data?.dataTable ?? [],
			total: data?.data?.totalCount
		}
	}
	const { tableProps } = useAntdTable(getTableData, { refreshDeps: [refreshTable] })
	return { tableProps }
}
