import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import Router from "next/router";

// 초기 상태 정의
const initialState: any = {
  reviewList: [],
  singleList: {},
  isLoading: false,
  error: "",
};

export const deleteReview = createAsyncThunk(
  "review/delete",
  async (data: { id: string }) => {
    await apis.reviewsApi.delete(data.id);
    Router.push("/review");
  }
);

export const getReviews = createAsyncThunk(
  "review/list",
  async (data: { searchType: string; searchValue: string | any[] }) => {
    const result = await apis.reviewsApi.list(data);
    return result.data;
  }
);

export const getSingleReview = createAsyncThunk(
  "review/singleList",
  async (id: any) => {
    const result = await apis.reviewsApi.singleList(id);
    return result.data;
  }
);

export const registerComment = createAsyncThunk(
  "review_comment/register",
  async (data: { id: string | string[] | undefined; data: any }) => {
    const result = await apis.reviewsApi.registerComment(data);
    return result.data;
  }
);
export const updateComment = createAsyncThunk(
  "review_comment/update",
  async (data: { commentId: string; data: any }) => {
    const result = await apis.reviewsApi.updateComment(data);
    return result.data;
  }
);
export const deleteComment = createAsyncThunk(
  "review_comment/delete",
  async (data: { commentId: string }) => {
    const result = await apis.reviewsApi.deleteComment(data);
    return result.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    // list
    [getReviews.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [getReviews.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.reviewList = action.payload || [];
      state.error = "";
    },
    [getReviews.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "리스트 조회에 실패했습니다.";
    },
    // singleList
    [getSingleReview.pending.type]: (state, action) => {
      state.isLoading = true;
      state.singleList = {};
      state.error = "";
    },
    [getSingleReview.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.singleList = action.payload || {};
      state.error = "";
    },
    [getSingleReview.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "상세 리뷰 조회에 실패했습니다.";
    },
    // Comment
  },
});

export default reviewSlice.reducer;
