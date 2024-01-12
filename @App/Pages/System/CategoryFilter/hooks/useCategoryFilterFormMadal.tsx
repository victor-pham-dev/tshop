import { Modal } from "antd";
import React, { useState } from "react";
import CategoryFilterForm from "../pages/DetailPage/components/CategoryFilterForm";


export const useCategoryFilterFormModal = () => {
    const [openModal, setOpenModal] = useState(true);
    // const [confirmLoading, setConfirmLoading] = useState(false); 
    // const [modalText, setModalText] = useState('Content of the modal');

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

//      const handleOk = () => {
//     setModalText('The modal will be closed after two seconds');
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setOpenModal(false);
//       setConfirmLoading(false);
//     }, 2000);
//   };

    const renderModal = () => {
        return(
            openModal && (
                <Modal
                    open={openModal}
                    onCancel={handleClose}
                    footer={null}
                    title="Modal"
                    // confirmLoading={confirmLoading}
                >
                    <CategoryFilterForm/>
                </Modal>
            )
        );
    };

    return{
        handleOpenCategoryFilterModal: handleOpen,
        handleCloseCategoryFilterModal: handleClose,
        renderCategoryModal: renderModal
    }
};