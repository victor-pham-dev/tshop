import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { roleServices } from '../../services/roleServices'

interface PagingParam {
	current: number
	pageSize: number
}

interface Result {
	total: number
	list: any[]
}

export const useTable = () => {
	const getTableData = async ({ current, pageSize }: PagingParam, formData: Object): Promise<Result> => {
		const data = await roleServices.search({ options: { page: current, pageSize: pageSize, ...formData } })
		return {
			list: data?.data?.dataTable ?? [],
			total: data?.data?.totalCount
		}
	}
	return { getTableData }
}
