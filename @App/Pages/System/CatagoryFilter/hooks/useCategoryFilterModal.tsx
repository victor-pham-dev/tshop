import { useEffect, useState } from 'react'
import { Button, Modal, Spin } from 'antd'
import AddCategoryForm from '../pages/DetailPage/component/AddCategoryFilterForm'
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
					footer={[
					// <Button key="back" onClick={()=>{}}>
					// 	Return
					// </Button>,
					
					]}
				>
					<AddCategoryForm/>
				</Modal>
						// )
		)
	}

	return { handleOpen,handleClose,renderModal }
}
