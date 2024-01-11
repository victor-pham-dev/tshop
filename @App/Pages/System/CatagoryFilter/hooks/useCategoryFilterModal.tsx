import { useState } from 'react'
import { Modal } from 'antd'
import CategoryForm from '../../Category/components/CategoryForm'
export const useCategoryFilterModal = () => {
	const [openModal, setOpenModal] = useState(true)

	const handleOpen = () => {
		setOpenModal(true)
	}

	const handleClose = () => setOpenModal(false)

	const renderModal = () => {
		return (
			// openModal && (
			<Modal
				width={600}
				open={openModal}
				title="Title"
				onCancel={handleClose}
				footer={
					[
						// <Button key="back" onClick={()=>{}}>
						// 	Return
						// </Button>,
					]
				}
			>
				<CategoryForm />
			</Modal>
			// )
		)
	}

	return { handleOpen, handleClose, renderModal }
}
