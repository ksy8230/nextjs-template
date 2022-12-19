import { createSlice } from "@reduxjs/toolkit";
import { ICompanyState } from "./type";
// import Router from "next/router";

// 초기 상태 정의
const initialState: ICompanyState = {
  companyList: [],
  isLoading: false,
  error: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default companySlice.reducer;
