import RoleListProvider from './RoleListProvider'
import Table from './components/Table'

const RoleList = () => {
	return (
		<RoleListProvider>
			<Table />
		</RoleListProvider>
	)
}

export default RoleList