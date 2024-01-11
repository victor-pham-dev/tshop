import { useRouter } from 'next/router'
import DetailCategoryFilterProvider from './DetailCategoryFilterProvider'
import CategoryForm from './component/CategoryFilterForm'
import { useCategoryFilterDetail } from './hooks/useCategoryFilterDetail'
import { Spin } from 'antd'

const DetailPage = () => {
	const router = useRouter()
	const { id } = router.query

	const { detailCategoryFilter, fetchingDetailCategoryFilter } = useCategoryFilterDetail(id as string)

	return (
		<DetailCategoryFilterProvider>
			<h3 className="my-4"> {id === 'new' ? 'Thêm mới bộ lọc' : 'Chỉnh sửa bộ lọc'}</h3>
			<div className="flex justify-center ">
				<div className="w-full ">
					{fetchingDetailCategoryFilter ? (
						<div className="items-center justify-center w-full h-screen">
							<Spin />
						</div>
					) : (
						<CategoryForm initData={detailCategoryFilter?.data ?? {}} />
					)}
				</div>
			</div>
		</DetailCategoryFilterProvider>
	)
}
export default DetailPage
