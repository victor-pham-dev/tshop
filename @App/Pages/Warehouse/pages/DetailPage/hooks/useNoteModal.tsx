import { useState } from 'react'
import { Modal } from 'antd'
export const useNoteModal = () => {
	const [openImagesModal, setOpenImageModal] = useState(false)
	const [data, setData] = useState<string>('')

	const handleOpen = (description: string) => {
		setOpenImageModal(true)
		setData(description)
	}

	const render = () => {
		return (
			openImagesModal && (
				<Modal open={openImagesModal} onCancel={() => setOpenImageModal(false)} footer={null} title="Ghi chú">
					<div className="flex flex-col bg-gray" dangerouslySetInnerHTML={{ __html: data }}></div>
				</Modal>
			)
		)
	}

	return { handleOpenNoteModal: handleOpen, renderNoteModal: render }
}
