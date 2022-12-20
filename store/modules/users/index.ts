import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { UserState } from "./type";

// 초기 상태 정의
const initialState: UserState = {
  user: null,
  me: null,
  isLoading: false,
  isRegistered: false,
  error: "",
};

// export const whoIam = createAsyncThunk("user/whoIam", async () => {
//   const result = await apis.usersApi.whoIam();
//   return result;
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    whoIam(state, action) {
      state.me = action.payload;
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const { whoIam } = userSlice.actions;
