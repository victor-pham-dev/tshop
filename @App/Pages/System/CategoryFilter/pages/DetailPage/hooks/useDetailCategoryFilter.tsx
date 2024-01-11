import { systemDetailCategoryFilterService } from "@/@App/Pages/System/services/systemCategoryFilterService";

import { useRequest } from "ahooks";
import { useEffect } from "react";


export const useDetailCategoryFilter = (id:string) => {
    const {
        data: detailCategoryFilterData,
        loading: fetchingCategoryFilterData,
        run: fetchCategoryFilter
    } = useRequest(
        systemDetailCategoryFilterService.find,{
            manual:true
        }
    )

    useEffect(() =>{
        if(id != 'new'){
            fetchCategoryFilter(id)
        }
    },[id])

    return{detailCategoryFilterData, fetchingCategoryFilterData}
};