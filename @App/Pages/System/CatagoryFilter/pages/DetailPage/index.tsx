import CategoryFilterProvider from "../CategoryFilterProvider"
import AddCategoryForm from "./component/AddCategoryFilterForm"

const DetailPage = ()=>{
    return (
        <CategoryFilterProvider>
            <AddCategoryForm/>
        </CategoryFilterProvider>
    )

}
export default DetailPage