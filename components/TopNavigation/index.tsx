import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Nav, NavContainer } from "./style";
import Button from "@mui/material/Button";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import apis from "../../api";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import * as userActions from "../../store/modules/users/index";

const TopNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { me, error, isRegistered } = useSelector(
    (state: RootState) => state.users
  );
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
    dispatch(userActions.login(form));
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
    dispatch(userActions.register(form));
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
          {me?.id ? (
            <>
              <Button variant="outlined">Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={handleOpenLogin} variant="outlined">
                Login
              </Button>
              <Button onClick={handleOpenSignUp} variant="outlined">
                Sign up
              </Button>
            </>
          )}
        </Nav>
      </NavContainer>

      <LoginModal
        openModal={openLogin}
        onClose={handleCloseLogin}
        onSubmit={onSubmit}
        error={error}
      />
      <SignupModal
        openModal={openSignUp}
        onClose={handleCloseSignUp}
        onSubmit={onSubmitRegister}
        isRegistered={isRegistered}
        error={error}
      />
    </>
  );
};

export default TopNavigation;
