import React from "react";
import Modal from "@mui/material/Modal";
import { ModalContent } from "../../../../components/TopNavigation/style";
import Button from "@mui/material/Button";
import { ISubmitFormModal } from "../../../../components/TopNavigation/components/types";

const DeleteModal = ({
  openModal,
  onClose,
  onSubmit,
  error,
}: ISubmitFormModal) => {
  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent>
        <p>해당 업체를 리스트에서 삭제하시겠습니까?</p>
        <Button type="button" variant="contained" fullWidth onClick={onSubmit}>
          DELETE
        </Button>
        {error && <p>{error}</p>}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
