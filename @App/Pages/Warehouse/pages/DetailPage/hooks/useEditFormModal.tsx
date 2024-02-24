import { useState } from 'react'
import { Modal, Spin } from 'antd'
import EditBillForm from '../components/EditBillForm'

export const useEditFormModal = () => {
	const [open, setOpen] = useState(false)
	const [data, setData] = useState<any>(null)

	const handleOpen = (initData: any) => {
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
