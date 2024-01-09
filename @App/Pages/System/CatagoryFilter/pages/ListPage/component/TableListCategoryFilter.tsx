import { useCorePageContext } from "@/@App/Core/hooks/useAppContext"
import { Button } from "antd";

const TableListCategoryFilter = ()=>{
	const {handleOpen} = useCorePageContext()
    return(
        <>
        <Button
            onClick={handleOpen}
				type="primary"
				color="success"
				style={{ width: '20%', marginBottom: '10px' }}
			>
				Thêm mới
			</Button>

            table
        </>
    )
}
export default TableListCategoryFilter