import DetailCategoryFilterProvider from './DetailCategoryFilterProvider'
import AddCategoryForm from './component/AddCategoryFilterForm'

const DetailPage = () => {
	return (
		<DetailCategoryFilterProvider>
			<div className="flex justify-center ">
				<div className="w-full ">
					<AddCategoryForm />
				</div>
			</div>
		</DetailCategoryFilterProvider>
	)
}
export default DetailPage
