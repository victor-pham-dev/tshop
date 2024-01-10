import { CorePageProvider } from "@/@App/Core/provider/CorePageProvider"
import { ReactNode } from "react"
import { useCategoryFormModal } from "../../../Category/hooks/useCategoryFormModal"

interface ListPageCategoryFilterProps {
    children: ReactNode 
}

const ListPageCategoryFilterProvider: React.FC<any> = ({ children, ...restProps }) => {
    const {handleOpenAddCategoryFilter , renderAddCategoryFilter } = useCategoryFormModal()
    const data = { 
        handleOpenAddCategoryFilter ,
        renderAddCategoryFilter ,
        ...restProps
        } 

    return (
        <CorePageProvider {...data}>{children}</CorePageProvider>
    );
} 

export default ListPageCategoryFilterProvider
