import { useState, useCallback } from 'react'
import { Modal } from 'antd'
import { FromRole } from '../components/FromRoleUser'


export const useRoleModal = () => {
	const [openModal, setOpenModal] = useState(false)

	const handleOpenRoleModal = useCallback(
		() => setOpenModal(true),[]
	)

	const handleCloseRoleModal = useCallback(() => setOpenModal(false), [])

	const renderRoleModal = useCallback(() => {
		return (
			openModal && (
				<Modal open={openModal} onCancel={handleCloseRoleModal} footer={null} title={'Thêm quyền user'}>
					<FromRole />
				</Modal>
			)
		)
	}, [openModal])

	return { handleOpenRoleModal, renderRoleModal, handleCloseRoleModal }
}
