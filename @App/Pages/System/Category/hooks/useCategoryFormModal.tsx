import { useState, useCallback } from 'react'
import { Modal, Spin } from 'antd'
import CategoryForm from '../components/CategoryForm'
import { useRequest } from 'ahooks'
import { systemCategoryService } from '../../services/systemCategoryService'

export interface role {
	id: number
	label: string
	alias: string
	isActive: number
	deleted: number
}
export const useCategoryFormModal = () => {
	const [openModal, setOpenModal] = useState(false)
	const [initData, setInitData] = useState<any>(null)
	const { runAsync, loading } = useRequest(systemCategoryService.find, {
		manual: true
	})

	const handleOpen = async (id: string) => {
		setOpenModal(true)
		if (id !== 'new') {
			const data = await runAsync(id)
			setInitData(data?.data)
		} else {
			setInitData(null)
		}
	}

	const handleClose = () => setOpenModal(false)

	const renderModal = () => {
		return (
			openModal && (
				<Modal
					open={openModal}
					onCancel={handleClose}
					footer={null}
					title={loading || initData ? 'Sửa danh mục' : 'Tạo danh mục lớn'}
				>
					{loading ? (
						<div className="flex justify-center">
							<Spin />
						</div>
					) : (
						<CategoryForm data={initData} />
					)}
				</Modal>
			)
		)
	}

	return {
		handleOpenAddCategoryModal: handleOpen,
		handleCloseAddCategoryModal: handleClose,
		renderAddCategoryModal: renderModal
	}
}
