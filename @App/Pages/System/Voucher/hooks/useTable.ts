import { useAntdTable } from 'ahooks'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { voucherService } from '../../services/voucherService'

interface PagingParam {
	current: number
	pageSize: number
}

interface Result {
	total: number
	list: any[]
}

export const useTable = () => {
	const { refreshTable, trigger } = useCoreContext()

	const getTableData = async ({ current, pageSize }: PagingParam, formData: Object): Promise<Result> => {
		const data = await voucherService.search({ params: { page: current, pageSize: pageSize, ...formData } })

		return {
			list: data?.data?.dataTable ?? [],
			total: data?.data?.totalCount
		}
	}
	const { tableProps } = useAntdTable(getTableData, { refreshDeps: [refreshTable] })
	return { tableProps }
}
