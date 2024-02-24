import { useState, useCallback } from 'react'
import { Modal, Spin } from 'antd'
import { BannerFormDetail } from '../components/BannerFormDetail'
import { useRequest } from 'ahooks'
import { bannerService } from '../../services/bannerService'

export interface role {
	id: number
	label: string
	alias: string
	isActive: number
	deleted: number
}
export const useBannerFormModal = () => {
	const [openModal, setOpenModal] = useState(false)
	const [initData, setInitData] = useState<any>({ data: null })
	const { runAsync, loading } = useRequest(bannerService.find, {
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
				<Modal open={openModal} onCancel={handleClose} footer={null} title={'Cập nhật / tạo mới	'}>
					{loading ? (
						<div className="flex justify-center">
							<Spin />
						</div>
					) : (
						<BannerFormDetail data={initData} />
					)}
				</Modal>
			)
		)
	}

	return { handleOpenDetailModal: handleOpen, handleCloseDetailModal: handleClose, renderDetailModal: renderModal }
}
