import { useCorePageContext } from "@/@App/Core/hooks/useAppContext"
import Table from "@/@App/Pages/Admin/RoleList/components/Table";
import { Button } from "antd"
import { Console } from "console";


const TableListCategoryFilter = () => {
    const a = useCorePageContext() ; 
  
    const { handleOpenAddCategoryFilter , renderAddCategoryFilter } = useCorePageContext() ;
   console.log("abcc" , a)
    return <>
    	<Button onClick={() => handleOpenAddCategoryFilter('new')}  type="primary" className="mb-2 w-max">
				Thêm mới bộ lọc
			</Button>
            <Table />
			{renderAddCategoryFilter()}
		</>

}
export default TableListCategoryFilter