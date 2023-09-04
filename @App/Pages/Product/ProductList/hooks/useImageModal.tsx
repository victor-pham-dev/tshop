import { useState } from 'react'
import { Image, Modal } from 'antd'
export const useImageModal = () => {
	const [openImagesModal, setOpenImageModal] = useState(false)
	const [images, setImages] = useState<string[]>([])

	const handleOpenImageModal = (list: string[]) => {
		setOpenImageModal(true)
		setImages(list)
	}

	const renderImagesModal = () => {
		return (
			openImagesModal && (
				<Modal
					open={openImagesModal}
					onCancel={() => setOpenImageModal(false)}
					footer={null}
					title="Danh sách ảnh sản phẩm"
				>
					<div className="flex flex-col bg-gray">
						{images.map(img => (
							<Image key={img} src={img} alt={img} />
						))}
					</div>
				</Modal>
			)
		)
	}

	return { handleOpenImageModal, renderImagesModal }
}
