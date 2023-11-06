import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormDetailModal } from './hooks/useFormDetailModal'

const BannerListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const router = useRouter()
	const [refreshTable, setRefreshTable] = useState<Boolean>(false)
	const triggerRefresh = () => setRefreshTable(prev => !prev)

	// const { handleOpenRoleModal, renderRoleModal, handleCloseRoleModal } = useRoleModal()
	const { handleCloseDetailModal, handleOpenDetailModal, renderDetailModal } = useFormDetailModal()

	const data = {
		handleCloseDetailModal,
		handleOpenDetailModal,

		refreshTable,
		triggerRefresh,
		...restProps
	}
	return (
		<CoreProvider {...data}>
			{children} {renderDetailModal()}
		</CoreProvider>
	)
}

export default BannerListProvider
