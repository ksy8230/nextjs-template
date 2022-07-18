import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { TLoginData } from "../../../api/users/type";
import { ICompanyState, TCompony } from "./type";
import Router from "next/router";

// 초기 상태 정의
const initialState: ICompanyState = {
  companyList: null,
  isLoading: false,
  error: "",
};

export const registerCompany = createAsyncThunk(
  "company/register",
  async (data: any) => {
    const result = await apis.companiesApi.register(data);
    console.log(result);
    if (result?.data?.data) Router.reload();
  }
);

export const getCompanies = createAsyncThunk("company/list", async () => {
  const result = await apis.companiesApi.list();
  console.log(result);
  // if (result?.data?.data) Router.reload();
});

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: {
    // register
    [registerCompany.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [registerCompany.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [registerCompany.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "로그인에 실패했습니다.";
    },
  },
});

export default companySlice.reducer;
