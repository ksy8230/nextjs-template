import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { ICompanyState, TCompony } from "./type";
import Router from "next/router";

// 초기 상태 정의
const initialState: any = {
  reviewList: [],
  singleList: {},
  isLoading: false,
  error: "",
};

export const registerReview = createAsyncThunk(
  "review/register",
  async (data: any) => {
    const result = await apis.reviewsApi.register(data);
    console.log(result);
    // if (result?.data) Router.reload();
  }
);

// export const updateCompany = createAsyncThunk(
//   "company/update",
//   async (data: { data: TCompony; id: number }) => {
//     const result = await apis.companiesApi.update(data.data, data.id);
//     if (result?.data) Router.reload();
//   }
// );

// export const deleteCompany = createAsyncThunk(
//   "company/delete",
//   async (id: number) => {
//     await apis.companiesApi.delete(id);
//     Router.reload();
//   }
// );

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

// export const getCompaniesAND = createAsyncThunk(
//   "company/list_AND_region",
//   async (data: {
//     searchCategory: string | any[];
//     searchRegion: string | number;
//   }) => {
//     const result = await apis.companiesApi.listAND(data);
//     return result.data;
//   }
// );

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    // register
    [registerReview.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [registerReview.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [registerReview.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "리뷰 추가에 실패했습니다.";
    },
    // delete
    // [deleteCompany.pending.type]: (state, action) => {
    //   state.isLoading = true;
    //   state.error = "";
    // },
    // [deleteCompany.fulfilled.type]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = "";
    // },
    // [deleteCompany.rejected.type]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = "업체 삭제에 실패했습니다.";
    // },
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
    // list_AND_region
    // [getCompaniesAND.pending.type]: (state, action) => {
    //   state.isLoading = true;
    //   state.error = "";
    // },
    // [getCompaniesAND.fulfilled.type]: (state, action) => {
    //   state.isLoading = false;
    //   state.companyList = action.payload || [];
    //   state.error = "";
    // },
    // [getCompaniesAND.rejected.type]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = "리스트 조회에 실패했습니다.";
    // },
  },
});

export default reviewSlice.reducer;
