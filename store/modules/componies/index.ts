import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { ICompanyState } from "./type";
import Router from "next/router";

// 초기 상태 정의
const initialState: ICompanyState = {
  companyList: [],
  isLoading: false,
  error: "",
};

export const registerCompany = createAsyncThunk(
  "company/register",
  async (data: any) => {
    const result = await apis.companiesApi.register(data);
    console.log(result);
    if (result?.data) Router.reload();
  }
);

export const updateCompany = createAsyncThunk(
  "company/update",
  async (data: any) => {
    const result = await apis.companiesApi.update(data);
    console.log(result);
    // if (result?.data) Router.reload();
  }
);

export const getCompanies = createAsyncThunk("company/list", async () => {
  const result = await apis.companiesApi.list();
  return result.data;
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
      state.error = "업체 추가에 실패했습니다.";
    },
    // list
    [getCompanies.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [getCompanies.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.companyList = action.payload;
      state.error = "";
    },
    [getCompanies.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "리스트 조회에 실패했습니다.";
    },
  },
});

export default companySlice.reducer;
