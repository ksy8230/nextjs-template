import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { TLoginData } from "../../../api/users/type";
import { TUser, UserState } from "./type";

// 초기 상태 정의
const initialState: UserState = {
  user: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (data: TLoginData) => {
    const result = await apis.usersApi.login(data);
    console.log(result);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
