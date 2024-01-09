import { ReactNode } from "react"
import CategoryFilterProvider from "../CategoryFilterProvider"
import TableListCategoryFilter from "./component/TableListCategoryFilter"
import { Button } from "antd"
import { useCorePageContext } from "@/@App/Core/hooks/useAppContext"
import {useCategoryFilterModal} from "../../hooks/useCategoryFilterModal"
const ListPageCategoryFilter = ()=>{
 
    return (
        <CategoryFilterProvider>
            
            <TableListCategoryFilter/>
        </CategoryFilterProvider>
    )
}
export default ListPageCategoryFilter