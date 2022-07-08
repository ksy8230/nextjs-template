import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Nav, NavContainer } from "./style";
import Button from "@mui/material/Button";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import apis from "../../api";
import Router from "next/router";

const TopNavigation = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

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
      const res = await apis.usersApi.login(data);
      console.log(res);
      Router.push("/home");
    } catch (e) {
      console.error(e);
    }
  };
  // 회원가입 폼 전송
  const onSubmitRegister = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      username: { value: string };
      password: { value: string };
      name: { value: string };
      email: { value: string };
    };
    const form = {
      username: target.username.value,
      password: target.password.value,
      name: target.name.value,
      email: target.email.value,
    };
    console.log(form);
    postRegister(form);
    // dispatch(userActions.register(form)); TODO -> redux 상태관리
  };
  // 회원가입 호출 함수
  const postRegister = async (data: any) => {
    try {
      const res = await apis.usersApi.register(data);
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
          <Button onClick={handleOpenLogin} variant="outlined">
            Login
          </Button>
          <Button onClick={handleOpenSignUp} variant="outlined">
            Sign up
          </Button>
        </Nav>
      </NavContainer>

      <LoginModal
        openModal={openLogin}
        onClose={handleCloseLogin}
        onSubmit={onSubmit}
      />
      <SignupModal
        openModal={openSignUp}
        onClose={handleCloseSignUp}
        onSubmit={onSubmitRegister}
      />
    </>
  );
};

export default TopNavigation;
