import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { systemCategoryFilterService } from '@/@App/Pages/System/services/systemCategoryFilterService'
import { useAntdTable } from 'ahooks'

interface PagingParam {
	current: number
	pageSize: number
}

interface Result {
	total: number
	list: any[]
}
export const useTableListCategoryFilter = () => {
	const { refreshTable } = useCorePageContext()

	const getTableData = async ({ current, pageSize }: PagingParam, formData: Object): Promise<Result> => {
		const data = await systemCategoryFilterService.search({
			params: { page: current, pageSize: pageSize, ...formData }
		})
		return {
			list: data?.data?.dataTable ?? [],
			total: data?.data?.totalCount
		}
	}
	const { tableProps } = useAntdTable(getTableData, { refreshDeps: [refreshTable] })
	return { tableProps }
}
