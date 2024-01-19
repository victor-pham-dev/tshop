import { CorePageProvider } from "@/@App/Core/provider/CorePageProvider";
import { ReactNode, useState } from "react";
import { useCategoryFilterFormModal } from "../hooks/useCategoryFilterFormMadal";

interface CategoryFilterProviderProps{
    children: ReactNode
}


const ListPageCategoryFilterProvider: React.FC<CategoryFilterProviderProps> = props => {

    const {children, ...restProps} = props;
    const [refreshTable, setRefreshTable] = useState<Boolean>(false);
    const triggerRefresh = () => setRefreshTable(prev => ! prev)

    const data = {
        ...restProps,
        refreshTable,
        triggerRefresh
    } 

    return(
        <CorePageProvider {...data} >
        {children}
        </CorePageProvider>
    );
}

export default ListPageCategoryFilterProvider

