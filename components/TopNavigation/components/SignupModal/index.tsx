import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ModalContent, SignUpContainer } from "../../style";
import TextField from "@mui/material/TextField";
import { IRegisterModal } from "../types";

const SignupModal = ({
  openModal,
  onClose,
  onSubmit,
  error,
  isRegistered,
}: IRegisterModal) => {
  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent>
        <SignUpContainer>
          {isRegistered ? (
            <div>
              <p>회원가입에 성공했습니다!</p>
              <p>로그인 해주세요 😆</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <TextField
                id="username"
                label="username"
                variant="outlined"
                fullWidth
                className="custom-text-field"
                required
              />
              <TextField
                id="password"
                label="password"
                variant="outlined"
                type="password"
                fullWidth
                className="custom-text-field"
                required
              />
              <TextField
                id="name"
                label="name"
                variant="outlined"
                fullWidth
                className="custom-text-field"
                required
              />
              <TextField
                id="email"
                label="email"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
              <Button type="submit" variant="contained" fullWidth>
                Sign Up
              </Button>
            </form>
          )}

          {error && <p>{error}</p>}
        </SignUpContainer>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
