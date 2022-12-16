import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import * as userActions from "../../store/modules/users/index";
import { IUser } from "../../store/modules/users/type";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import UserEditModal from "./components/UserEditModal";
import { IconHome } from "../Icon";

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
  const handleOpenUserEdit = () => setOpenUserEdit(true);
  const handleCloseUserEdit = () => setOpenUserEdit(false);

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

  // 유저 수정 폼 전송
  const onSubmitUserEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      password: { value: string };
      name: { value: string };
      email: { value: string };
    };
    const form = {
      password: target.password.value,
      name: target.name.value,
      email: target.email.value,
    };
    console.log(form);
    dispatch(userActions.updateUser(form));
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

  useEffect(() => {
    dispatch(userActions.whoIam());
  }, []);

  return (
    <>
      <div className="flex items-center justify-between max-w-[80rem] m-auto">
        <div className="pt-4 pb-4 flex items-center">
          <span>
            <Link href="/home">
              <IconHome />
            </Link>
          </span>
          <span className="ml-4">
            <Link href="/company">업체 등록</Link>
          </span>
          <span className="ml-4">
            <Link href="/review">업체 리뷰</Link>
          </span>
        </div>
        <div className="pt-4 pb-4 flex items-center">
          {hydrate?.username || me?.username ? (
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
                <MenuItem onClick={handleOpenUserEdit}>내 정보 수정</MenuItem>
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
        </div>
      </div>

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
      <UserEditModal
        openModal={openUserEdit}
        onClose={handleCloseUserEdit}
        onSubmit={onSubmitUserEdit}
        isEdited={isRegistered}
        error={error}
        user={me}
      />
    </>
  );
};

export default TopNavigation;
