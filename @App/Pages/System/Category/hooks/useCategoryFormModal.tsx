import { useState, useCallback } from 'react'
import { Modal, Spin } from 'antd'
import { CategoryFromDetail } from '../components/CategoryFromDetail'
import { useRequest } from 'ahooks'
import { categoryService } from '../../services/categoryService'

export interface role {
	id: number
	label: string
	alias: string
	isActive: number
	deleted: number
}
export const useCategoryFormModal = () => {
	const [openModal, setOpenModal] = useState(false)
	const [initData, setInitData] = useState<any>({ data: null })
	const { runAsync, loading } = useRequest(categoryService.find, {
		manual: true
	})

	const handleOpen = async (id: string) => {
		if (id !== 'new') {
			const data = await runAsync(id)
			setInitData(data)
		} else {
			setInitData({ data: null })
		}
		setOpenModal(true)
	}

	const handleClose = () => setOpenModal(false)

	const renderModal = () => {
		return (
			openModal && (
				<Modal open={openModal} onCancel={handleClose} footer={null} width={'90%'} title={'Cập nhật / tạo mới	'}>
					{loading ? (
						<div className="flex justify-center">
							<Spin />
						</div>
					) : (
						<CategoryFromDetail data={initData} />
					)}
				</Modal>
			)
		)
	}

	return { handleOpenDetailModal: handleOpen, handleCloseDetailModal: handleClose, renderDetailModal: renderModal }
}
