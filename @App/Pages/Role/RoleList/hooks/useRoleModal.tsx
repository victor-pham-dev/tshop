import { useState, useCallback } from 'react'
import { Modal } from 'antd'
import { FromRole } from '../components/FromRole'

export interface role {
	id: number
	label: string
	alias: string
	isActive: number
	deleted: number
}
export const useRoleModal = () => {
	const [openModal, setOpenModal] = useState(false)
	const [data, setData] = useState<role | null>()

	const handleOpenRoleModal = useCallback(
		(dataModel: role | null = null) => {
			setOpenModal(true)
			if (data !== dataModel) {
				setData(dataModel)
			}
		},
		[data]
	)

	const handleCloseRoleModal = useCallback(() => setOpenModal(false), [])

	const renderRoleModal = useCallback(() => {
		return (
			openModal && (
				<Modal
					open={openModal}
					onCancel={handleCloseRoleModal}
					footer={null}
					title={data ? `Chỉnh sửa quền: ${data.label}` : 'Thêm quyền'}
				>
					<FromRole data={data} />
				</Modal>
			)
		)
	}, [openModal])

	return { handleOpenRoleModal, renderRoleModal, handleCloseRoleModal }
}
