import clsx from 'clsx'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	className?: string
}

const CoreCard: React.FC<Props> = ({ children, className }) => {
	return <div className={clsx('p-2 bg-white rounded-md shadow-md', className && className)}>{children}</div>
}
export default CoreCard
