import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { TLoginData, TRegisterData } from "../../../api/users/type";
import { TUser, UserState } from "./type";
import Router from "next/router";

// 초기 상태 정의
const initialState: UserState = {
  user: null,
  me: null,
  isLoading: false,
  isRegistered: false,
  error: "",
};

export const login = createAsyncThunk(
  "user/login",
  async (data: TLoginData) => {
    const result = await apis.usersApi.login(data);
    console.log(result);
    if (result?.data?.data) Router.reload();
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const result = await apis.usersApi.logout();
  Router.reload();
});

export const register = createAsyncThunk(
  "user/register",
  async (data: TRegisterData) => {
    await apis.usersApi.register(data);
  }
);

export const whoIam = createAsyncThunk("user/whoIam", async () => {
  const result = await apis.usersApi.whoIam();
  console.log(result);
  return result.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // login
    [login.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [login.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "로그인에 실패했습니다.";
    },
    // register
    [register.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [register.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isRegistered = true;
      state.error = "";
    },
    [register.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isRegistered = false;
      state.error = "회원가입에 실패했습니다.";
    },
    // whoIam
    [whoIam.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [whoIam.fulfilled.type]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.me = action.payload;
    },
    [whoIam.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "내 정보를 불러올 수 없습니다.";
    },
  },
});

export default userSlice.reducer;
