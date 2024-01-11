import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { Button, Table } from 'antd'

const TableListCategoryFilter = () => {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age'
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address'
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address'
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address'
		}
	]
	return <Table columns={columns}></Table>
}
export default TableListCategoryFilter
