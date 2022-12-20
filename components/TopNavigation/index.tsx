import Link from "next/link";
import React, { SyntheticEvent, useState, useEffect } from "react";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  IPostLogInReq,
  IPostLogInRes,
  IPostLogoutReq,
  IPostLogoutRes,
  IPostRegisterReq,
  IPostRegisterRes,
  IPostUpdateReq,
  IPostUpdateRes,
  KEY_ME,
} from "../../api/users/type";
import { IErrorResponse } from "../../api/companies/types";
import apis from "../../api";
import { useRouter } from "next/router";
import { ROUTE_PATH } from "../../constants";

interface IState extends RootState {
  hydrate: IUser;
}

const TopNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { me: meState, error } = useSelector((state: RootState) => state.users);
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
    loginMutate(form);
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
    registerMutate(form);
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
    updateMutate(form);
  };

  // 로그아웃
  const onLogout = () => logoutMutate({});

  const { mutate: loginMutate } = useMutation<
    IPostLogInRes,
    IErrorResponse,
    IPostLogInReq
  >((form) => apis.usersApi.login(form), {
    onSuccess: () => {
      handleCloseLogin();
      reFetchMe();
      router.push(ROUTE_PATH.home);
    },
  });

  const { mutate: logoutMutate } = useMutation<
    IPostLogoutRes,
    IErrorResponse,
    IPostLogoutReq
  >(() => apis.usersApi.logout(), {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY_ME);
      queryClient.setQueryData([KEY_ME], {});
      dispatch(userActions.whoIam({}));
      router.push(ROUTE_PATH.home);
    },
  });

  const { mutate: registerMutate, isSuccess: isSuccessRegister } = useMutation<
    IPostRegisterRes,
    IErrorResponse,
    IPostRegisterReq
  >((form) => apis.usersApi.register(form));

  const { mutate: updateMutate, isSuccess: isSuccessUpdate } = useMutation<
    IPostUpdateRes,
    IErrorResponse,
    IPostUpdateReq
  >((form) => apis.usersApi.updateUser(form), {
    onSuccess: (data) => {
      // ERROR : 내 정보 수정 시 비밀번호 필수값인데 이걸 수정하면 세션 토큰이 변경되어 재로그인해야함
    },
  });

  const {
    data: me,
    isLoading: isLoadingMe,
    refetch: reFetchMe,
    isError,
  } = useQuery(KEY_ME, () => apis.usersApi.whoIam(), {
    enabled: false,
    retry: false,
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // 마이페이지 버튼
  const myPageElem = Boolean(anchorEl);
  const onClickMyPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isError) {
      dispatch(userActions.whoIam({}));
      queryClient.invalidateQueries(KEY_ME);
    }
    if (!isError && me) {
      dispatch(userActions.whoIam(me));
    }
  }, [isError, me]);

  useEffect(() => {
    reFetchMe();
  }, []);

  const LoadUserStateButton = () => {
    if (isLoadingMe) {
      return <div>내 정보 가져오는 중</div>;
    }
    if (meState?.username && !isLoadingMe) {
      return (
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
      );
    }
    if (!meState?.username || !isLoadingMe) {
      return (
        <>
          <Button onClick={handleOpenLogin} variant="outlined">
            Login
          </Button>
          <Button onClick={handleOpenSignUp} variant="outlined">
            Sign up
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between max-w-[80rem] m-auto">
        <div className="pt-4 pb-4 flex items-center">
          <span>
            <Link href="/home">HOME</Link>
          </span>
          <span className="ml-4">
            <Link href="/company">업체 조회</Link>
          </span>
          <span className="ml-4">
            <Link href="/review">업체 리뷰</Link>
          </span>
        </div>
        <div className="pt-4 pb-4 flex items-center">
          {LoadUserStateButton()}
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
        isRegistered={isSuccessRegister}
        error={error}
      />
      <UserEditModal
        openModal={openUserEdit}
        onClose={handleCloseUserEdit}
        onSubmit={onSubmitUserEdit}
        isEdited={isSuccessUpdate}
        error={error}
        user={me}
      />
    </>
  );
};

export default TopNavigation;
