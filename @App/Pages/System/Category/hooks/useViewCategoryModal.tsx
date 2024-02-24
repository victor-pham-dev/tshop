import { useState } from 'react'
import { Modal } from 'antd'
import CategoryDetail from '../components/CategoryDetail'

export const useViewCategoryModal = () => {
	const [openModal, setOpenModal] = useState(false)
	const [categoryId, setCategoryId] = useState<number | null>(null)

	const handleOpen = (id: number) => {
		setCategoryId(id)
		setOpenModal(true)
	}

	const handleClose = () => setOpenModal(false)

	const renderModal = () => {
		return openModal ? (
			<Modal open={openModal} onCancel={handleClose} footer={null} title="Chi tiết danh mục" width="auto">
				{categoryId ? <CategoryDetail id={categoryId} /> : null}
			</Modal>
		) : null
	}

	return { handleOpenDetailModal: handleOpen, handleCloseDetailModal: handleClose, renderDetailModal: renderModal }
}
