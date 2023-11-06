import { useState } from 'react'
import { WareHouseBill } from '@prisma/client'
import { Modal, Spin } from 'antd'
import EditBillForm from '../components/EditBillForm'

export const useEditFormModal = () => {
	const [open, setOpen] = useState(false)
	const [data, setData] = useState<WareHouseBill | null>(null)

	const handleOpen = (initData: WareHouseBill) => {
		setOpen(true)
		setData(initData)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const render = () => {
		return (
			open && (
				<Modal open={open} onCancel={handleClose} footer={null} title="Sửa log">
					{data ? <EditBillForm initData={data} handleCloseModal={handleClose} /> : <Spin />}
				</Modal>
			)
		)
	}

	return { handleOpenEditModal: handleOpen, renderEditModal: render, handleCloseEditModal: handleClose }
}
