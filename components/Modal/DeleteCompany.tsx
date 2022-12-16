import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ModalContent } from "../TopNavigation/style";
import { ISubmitFormModal } from "../TopNavigation/components/types";

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
        <Button type="button" fullWidth onClick={onSubmit}>
          DELETE
        </Button>
        {error && <p>{error}</p>}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
