import { CorePageProvider } from "@/@App/Core/provider/CorePageProvider";
import { ReactNode, useState } from "react";
import { useCategoryFilterFormModal } from "../hooks/useCategoryFilterFormMadal";


const ListPageCategoryFilterProvider: React.FC<any> = ({ children, ...restProps}) => {

    const [refreshTable, setRefreshTable] = useState<Boolean>(false);
    const triggerRefresh = () => setRefreshTable(prev => ! prev)

    // const {handleOpenCategoryFilterModal, 
    //         handleCloseCategoryFilterModal, 
    //         renderCategoryModal
    //         }= useCategoryFilterFormModal()

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