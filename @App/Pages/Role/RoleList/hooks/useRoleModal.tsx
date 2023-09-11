import { useState, useCallback } from 'react'
import { Modal } from 'antd'
import { FromRole } from './FromRole'

export interface role {
	id: number
	label: string
	alias: string
	isActive: number
	deleted: number
}
export const useDescriptionModal = () => {
	const [openImagesModal, setOpenImageModal] = useState(false)
	const [data, setData] = useState<role | null>()

	const handleOpenRoleModal = (dataModel: role | null = null) => {
		setOpenImageModal(true)
		if (data !== dataModel) {
			setData(dataModel)
		}
	}
	const FormSubmit = useCallback(() => {
		return <FromRole data={data} />
	}, [data])

	const renderRoleModal = () => {
		return (
			openImagesModal && (
				<Modal
					open={openImagesModal}
					onCancel={() => setOpenImageModal(false)}
					footer={null}
					title={data ? `Chỉnh sửa quền: ${data.label}` : 'Thêm quyền'}
				>
					<FormSubmit />
				</Modal>
			)
		)
	}

	return { handleOpenRoleModal, renderRoleModal }
}
