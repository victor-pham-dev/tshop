import { useEffect, useState } from 'react'
import { Modal, Spin } from 'antd'
import { VoucherFormDetail } from '../components/VoucherFormDetail'
import { useRequest } from 'ahooks'
import { voucherService } from '../../services/voucherService'

export const useFormDetailModal = () => {
	const [openModal, setOpenModal] = useState(false)
	const [id, setId] = useState<string>('new')
	const {
		data: initData,
		run,
		loading
	} = useRequest(voucherService.find, {
		manual: true
	})

	useEffect(() => {
		if (id !== 'new') {
			run(id)
		}
	}, [id])

	const handleOpen = (id: string) => {
		setId(id)

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
						<VoucherFormDetail data={id === 'new' ? null : initData} />
					)}
				</Modal>
			)
		)
	}

	return { handleOpenDetailModal: handleOpen, handleCloseDetailModal: handleClose, renderDetailModal: renderModal }
}
