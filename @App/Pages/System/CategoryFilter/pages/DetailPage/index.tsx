import { useRouter } from "next/router";
import { useDetailCategoryFilter } from "./hooks/useDetailCategoryFilter";
import DetailCategoryFilterProvider from "./DetailCategoryFilterProvider";
import CategoryFilterForm from "./components/CategoryFilterForm";

import { Spin } from "antd";

export const DetailPage = () =>{
    
    const router = useRouter();
    const {id} = router.query
    

    const {detailCategoryFilterData, fetchingCategoryFilterData} = useDetailCategoryFilter(id as string)

    return(
        <>
            <DetailCategoryFilterProvider>
                <h3 className="my-4">{id === 'new' ? 'Thêm mới bộ lọc' : 'Chỉnh sửa bộ lọc'}</h3>
                <div className="flex justify-center">
                    <div className="w-full">
                        {
                            fetchingCategoryFilterData 
                            ?(<div className="items-center w-full h-screen">
                                <Spin/>
                            </div>)
                            :(
                            <CategoryFilterForm initData={detailCategoryFilterData?.data ?? {}}/>
                            )
                        }
                    </div>
                </div>
            </DetailCategoryFilterProvider>
        </>
    );
}