import { useState } from 'react'
import { Image, Modal } from 'antd'
export const useDescriptionModal = () => {
	const [openImagesModal, setOpenImageModal] = useState(false)
	const [data, setData] = useState<string>('')

	const handleOpenDescriptionModal = (description: string) => {
		setOpenImageModal(true)
		setData(description)
	}

	const renderDescriptionModal = () => {
		return (
			openImagesModal && (
				<Modal
					open={openImagesModal}
					onCancel={() => setOpenImageModal(false)}
					footer={null}
					title="Mô tả sản phẩm"
				>
					<div className="flex flex-col bg-gray" dangerouslySetInnerHTML={{ __html: data }}></div>
				</Modal>
			)
		)
	}

	return { handleOpenDescriptionModal, renderDescriptionModal }
}
