import AppHeader from '@/@App/Layout/AppHeader'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Nav from './AppNav/Nav'
import NextNProgress from 'nextjs-progressbar'
interface CoreLayoutProps {
	children: ReactNode
}

const CoreLayout: React.FC<CoreLayoutProps> = ({ children }) => {
	const { pathname } = useRouter()
	const isAuthPage = pathname.includes('/auth')
	return (
		<div className="w-full h-[100vh] flex flex-col">
			{!isAuthPage && <AppHeader />}
			<NextNProgress />
			<div className="flex h-full">
				{!isAuthPage && (
					<div className="w-[280px] h-full">
						<Nav />
					</div>
				)}

				<div className="w-full h-full px-2 pb-20 overflow-y-scroll bg-gray-100">
					<div className="p-4 bg-gray-100 rounded-md">{children}</div>
				</div>
			</div>
		</div>
	)
}

export default CoreLayout
