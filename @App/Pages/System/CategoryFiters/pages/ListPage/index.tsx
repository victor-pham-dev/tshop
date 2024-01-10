
import ListPageCategoryFilterProvider from "./ListPageCategoryFilterProvider";
import TableListCategoryFilter from "./components/TableListCategoryFilter";
const ListPageCategoryFilter: React.FC = () => {
    const dataCallTuAPI = {name: 'tien'} 
    const data = {dataCallTuAPI}
    return (
        <ListPageCategoryFilterProvider {...data}>
            <TableListCategoryFilter/>
        </ListPageCategoryFilterProvider>
    );
} 

export default ListPageCategoryFilter
