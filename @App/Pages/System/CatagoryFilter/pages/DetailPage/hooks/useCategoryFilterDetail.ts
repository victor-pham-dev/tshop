import { systemCategoryFilterService } from '@/@App/Pages/System/services/systemCategoryFilterService'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { CategoryFilterEntity } from '../../ListPage/component/TableListCategoryFilter'

export const useCategoryFilterDetail = (id: string) => {
	const {
		data: detailCategoryFilter,
		loading: fetchingDetailCategoryFilter,
		run: fetchDetailCategoryFilter
	} = useRequest(systemCategoryFilterService.find, {
		manual: true
	})

	useEffect(() => {
		if (id !== 'new') {
			fetchDetailCategoryFilter(id)
		}
	}, [id])

	return { detailCategoryFilter, fetchingDetailCategoryFilter }
}
