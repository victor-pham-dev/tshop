import { CoreCard } from '@/@App/Core/components'
import { Modal, Select } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'

export interface FilterProps {
	label: string
	options: { value: string }[]
	required: boolean
	valueType: 'STRING' | 'NUMBER' | 'DATETIME' | 'SELECT'
}

export const useDetailFilterModal = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [modalData, setModalData] = useState<FilterProps[]>([])

	const handleOpen = (data: FilterProps[]) => {
		setModalData(data)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const valueTypeText = {
		STRING: 'Nhập chữ',
		NUMBER: 'Nhập số',
		DATETIME: 'Nhập / Chọn ngày',
		SELECT: 'Lựa chọn'
	}

	const render = () => {
		return open ? (
			<Modal title="Danh sách bộ lọc" open={open} onCancel={handleClose} footer={null}>
				<div className="flex flex-col gap-2">
					{modalData.map((item, index) => (
						<CoreCard className="flex flex-col gap-2  !bg-gray-100">
							<div className="flex gap-2">
								<span className="font-500">Phân loại:</span>
								<span
									className={clsx('font-600', {
										'text-red-500': !item.required,
										'text-green-500': item.required
									})}
								>
									{item.label}
								</span>
							</div>
							<div className="flex gap-2">
								<span className="font-500">Phân loại:</span>
								<span className="text-blue-500 font-600">{valueTypeText[item.valueType]}</span>
							</div>
							{item.valueType === 'SELECT' ? (
								<Select
									placeholder="Xem các lựa chọn sẵn có"
									options={item.options.map(item => ({ ...item, label: item.value }))}
								/>
							) : null}
						</CoreCard>
					))}
				</div>
			</Modal>
		) : null
	}

	return {
		handleOpenDetailFilterModal: handleOpen,
		handleCloseDetailFilterModal: handleClose,
		renderDetailFilterModal: render
	}
}
