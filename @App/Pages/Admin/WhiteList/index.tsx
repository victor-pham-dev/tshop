import RoleListProvider from './WhiteListProvider'
import Table from './components/Table'

const WhiteList = () => {
	return (
		<RoleListProvider>
			<Table />
		</RoleListProvider>
	)
}

export default WhiteList
