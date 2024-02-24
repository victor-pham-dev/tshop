import UserListProvider from './UserListProvider'
import UserTable from './components/UserTable'

const UserList = () => {
	return (
		<UserListProvider>
			<UserTable />
		</UserListProvider>
	)
}

export default UserList
