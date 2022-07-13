import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { Nav, NavContainer } from "./style";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import * as userActions from "../../store/modules/users/index";
import { IUser } from "../../store/modules/users/type";

interface IState extends RootState {
  hydrate: IUser;
}

const TopNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { me, error, isRegistered } = useSelector(
    (state: RootState) => state.users
  );
  const hydrate = useSelector((state: IState) => state.hydrate);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openUserEdit, setOpenUserEdit] = useState(false);

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

  // 로그아웃
  const onLogout = () => {
    dispatch(userActions.logout());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // 마이페이지 버튼
  const myPageElem = Boolean(anchorEl);
  const onClickMyPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          {hydrate?.username ? (
            <>
              <Button
                id="basic-button"
                aria-controls={myPageElem ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={myPageElem ? "true" : undefined}
                onClick={onClickMyPage}
              >
                My Page
              </Button>
              <Button variant="outlined" onClick={onLogout}>
                Logout
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={myPageElem}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>마이페이지</MenuItem>
                <MenuItem onClick={handleClose}>내 정보 수정</MenuItem>
              </Menu>
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
