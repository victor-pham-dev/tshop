import { useRouter } from "next/router";
import { useDetailCategoryFilter } from "./hooks/useDetailCategoryFilter";
import DetailCategoryFilterProvider from "./DetailCategoryFilterProvider";

export const DetailPage = () =>{
    
    const router = useRouter();
    const {id} = router.query
    

    const {detailCategoryFilterData, fetchingCategoryFilterData} = useDetailCategoryFilter(id as string)

    return(
        <>
            <DetailCategoryFilterProvider>
                <h1>Thanh Tung</h1>
            </DetailCategoryFilterProvider>
        </>
    );
}