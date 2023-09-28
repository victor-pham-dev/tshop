import RoleUsersProvider from './RoleUsersProvider'
import Table from './components/Table'

const RoleUsers = () => {
	return (
		<RoleUsersProvider>
			<Table />
		</RoleUsersProvider>
	)
}

export default RoleUsers