import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { LoginContainer, ModalContent, Nav, NavContainer } from "./style";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";

const TopNavigation = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpen = () => setOpenLoginModal(true);
  const handleClose = () => setOpenLoginModal(false);

  // 로그인 폼 전송
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      username: { value: string };
      password: { value: string };
    };
    const form = {
      username: target.username.value,
      password: target.password.value,
    };
    console.log(form);
    postLogin(form);
    // dispatch(userActions.login(form)); TODO -> redux 상태관리
  };
  // 로그인 호출 함수
  const postLogin = async (data: any) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/account/login/",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <NavContainer>
        <Nav>
          <Link href="/home">Home</Link>
          <Link href="/project">Project</Link>
          <Link href="/blog">Blog</Link>
        </Nav>
        <Nav>
          <Button onClick={handleOpen} variant="outlined">
            Login
          </Button>
        </Nav>
      </NavContainer>
      <Modal
        open={openLoginModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <LoginContainer>
            <form onSubmit={onSubmit}>
              <input type="text" id="username" />
              <input type="password" id="password" />
              <Button type="submit" variant="contained">
                로그인
              </Button>
            </form>
          </LoginContainer>
        </ModalContent>
      </Modal>
      {/* <LoginModal openLoginModal={openLoginModal} toggleModal={onLoginModal} /> */}
    </>
  );
};

export default TopNavigation;
