import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ModalContent, SignUpContainer } from "../../style";
import TextField from "@mui/material/TextField";
import { ISubmitFormModal } from "../types";

const LoginModal = ({
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
        <SignUpContainer>
          <form onSubmit={onSubmit}>
            <TextField
              id="username"
              label="username"
              variant="outlined"
              fullWidth
              className="custom-text-field"
            />
            <TextField
              id="password"
              label="password"
              variant="outlined"
              type="password"
              fullWidth
              className="custom-text-field"
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </form>
          {error && <p>{error}</p>}
        </SignUpContainer>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
