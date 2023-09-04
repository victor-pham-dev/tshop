import { Menu } from 'antd'
import { navList } from './navList'

const Nav: React.FC = () => {
	const { items } = navList()

	return <Menu mode="inline" style={{ width: '100%', height: '100%' }} theme="light" items={items} />
}

export default Nav
