import { CoreCard } from "@/@App/Core/components";
import { Modal, Select } from "antd";
import { useState } from "react";


export interface DetailCategoryFilter{
    label: string
    options: { value:string}[]
    required: boolean
    valueType: 'STRING' | 'NUMBER' | 'DATETIME' | 'SELECT'
}

export const useDetailCategoryFilterModal = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState<DetailCategoryFilter[]>([])


    const handleOpen = (data:DetailCategoryFilter[]) => {
        setModalData(data)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const valueTypeText = {
        STRING: 'Nhập chữ',
        NUMBER: 'Nhập số',
        DATETIME: 'Nhập/ Chọn ngày',
        SELECT: 'Lựa chọn'
    }

    const render = () => {
       return open ? (
        <Modal title="Details List"
        open={open}
        onCancel={handleClose}
        footer={null}>
            <div className="flex flex-col gap-2">
                {
                    modalData.map((item, index) =>(
                        <CoreCard className="flex flex-col gap-2 !bg-gray-100">
                            <div className="flex gap-2">
                                <span className="font-500">
                                    Phân loại:
                                </span>
                                <span className="{clsx('font-600', {
                                    'text-red-500': !item.required,
                                    'text-green-500': !item.required,
                                })}">
                                    {item.label}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-500">
                                    Phân loại:
                                </span>
                                <span className="text-blue-500 font-600">
                                    {valueTypeText[item.valueType]}
                                </span>
                            </div>
                            {
                                item.valueType === 'SELECT' ? (
                                <Select 
                                placeholder="Xem lựa chọn có sẵn"
                                options={item.options.map(item =>({...item, label:item.value}))}/>
                                ) :(null)
                            }
                        </CoreCard>
                    ))
                }
            </div>
        </Modal>
       ): null
    }

    return{
        handleOpenDetailFilterModal: handleOpen,
		handleCloseDetailFilterModal: handleClose,
		renderDetailFilterModal: render,
    
    }

}