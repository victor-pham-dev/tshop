import WarehouseListProvider from './WarehouseListProvider'
import Table from './components/Table'

const ListPage = () => {
	return (
		<WarehouseListProvider>
			<Table />
		</WarehouseListProvider>
	)
}

export default ListPage
