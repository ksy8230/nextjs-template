import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICounter } from ".";
import apis from "../../api";

// 초기 상태 정의
const initialState: ICounter = {
  value: 0,
  todo: {
    loading: false,
    data: {
      title: "",
      content: "",
    },
  },
};

export const getAsync = createAsyncThunk(
  `counter/getAsync`,
  async (data, thunkAPI) => {
    const result = await apis.counterApi.getCount();
    return result.data;
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: {
    [getAsync.pending.type]: (state, action) => {
      // 호출 전
      state.todo.loading = true;
    },
    [getAsync.fulfilled.type]: (state, action) => {
      // 성공
      state.todo.loading = true;
      state.todo.data.title = action.title;
      state.todo.data.content = action.content;
    },
    [getAsync.rejected.type]: (state, action) => {
      // 실패
      state.todo.loading = true;
      state.todo.data.title = "";
      state.todo.data.content = "";
    },
  },
});

export const { increment, decrement } = counterSlice.actions; // 액션 생성함수
export default counterSlice.reducer;
