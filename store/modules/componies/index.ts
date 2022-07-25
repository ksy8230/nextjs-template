import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../../api";
import { ICompanyState, TCompony } from "./type";
import Router from "next/router";

// 초기 상태 정의
const initialState: ICompanyState = {
  companyList: [],
  isLoading: false,
  error: "",
};

export const registerCompany = createAsyncThunk(
  "company/register",
  async (data: TCompony) => {
    const result = await apis.companiesApi.register(data);
    console.log(result);
    if (result?.data) Router.reload();
  }
);

export const updateCompany = createAsyncThunk(
  "company/update",
  async (data: { data: TCompony; id: number }) => {
    const result = await apis.companiesApi.update(data.data, data.id);
    if (result?.data) Router.reload();
  }
);

export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (id: number) => {
    await apis.companiesApi.delete(id);
    Router.reload();
  }
);

export const getCompanies = createAsyncThunk(
  "company/list",
  async (data: { searchType: string; searchValue: string | any[] }) => {
    const result = await apis.companiesApi.list(data);
    return result.data;
  }
);

export const getCompaniesAND = createAsyncThunk(
  "company/list_AND_region",
  async (data: {
    searchCategory: string | any[];
    searchRegion: string | number;
  }) => {
    const result = await apis.companiesApi.listAND(data);
    return result.data;
  }
);

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
    // delete
    [deleteCompany.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [deleteCompany.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [deleteCompany.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "업체 삭제에 실패했습니다.";
    },
    // list
    [getCompanies.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [getCompanies.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.companyList = action.payload || [];
      state.error = "";
    },
    [getCompanies.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "리스트 조회에 실패했습니다.";
    },
    // list_AND_region
    [getCompaniesAND.pending.type]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [getCompaniesAND.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.companyList = action.payload || [];
      state.error = "";
    },
    [getCompaniesAND.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = "리스트 조회에 실패했습니다.";
    },
  },
});

export default companySlice.reducer;
