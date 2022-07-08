import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { TLoginData } from "../../../api/users/type";
import { TUser, UserState } from "./type";

// 초기 상태 정의
const initialState: UserState = {
  user: null,
  me: null,
  isLoading: false,
  error: "",
};

export const login = createAsyncThunk(
  "user/login",
  async (data: TLoginData) => {
    const result = await apis.usersApi.login(data);
    console.log(result);
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
    [whoIam.pending.type]: (state, action) => {
      // 호출 전
      state.isLoading = true;
    },
    [whoIam.fulfilled.type]: (state, action) => {
      console.log(action);
      // 성공
      state.isLoading = false;
      state.me = action.payload;
    },
    [whoIam.rejected.type]: (state, action) => {
      // 실패
      state.isLoading = false;
      state.error = "내 정보를 불러올 수 없습니다.";
    },
  },
});

export default userSlice.reducer;
