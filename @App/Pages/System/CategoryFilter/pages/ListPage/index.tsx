import CategoryFilterProvide from "../CategoryFilterProvider";
import { SYSTEM_ROUTER } from "../../../configs/router";
import TableListCategoryFilter from "./components/TableListCategoryFilter";

import { useRouter } from "next/router";

import { Button } from "antd";

const ListPageCategoryFilter = () => {

  const router =  useRouter();

    return(
      <CategoryFilterProvide >
        <div className="flex items-center gap-2">
          <Button 
          type="primary"  
          className="mb-2 w-max"
          onClick={() => router.push(SYSTEM_ROUTER.CATEGORY_FILTER_DETAIL('new'))}
					color="success"
					style={{ width: '20%', marginBottom: '10px' }}>
              Thêm mới danh mục
          </Button>
        </div>
        <TableListCategoryFilter/>
      </CategoryFilterProvide>
    );
}

export default ListPageCategoryFilter