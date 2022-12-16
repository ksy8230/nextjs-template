import { socialApiClient } from "../client";
import {
  IGetCompaniesReq,
  IPutCompanyReq,
  IPostCompanyReq,
  IDeleteCompanyReq,
} from "./types";

export const api = {
  async register(data: IPostCompanyReq) {
    const res = await socialApiClient.post("/company/register/", data);
    return res.data;
  },
  async update(data: IPutCompanyReq) {
    const res = await socialApiClient.put(`/company/update/${data.id}`, data);
    return res.data;
  },
  async delete(data: IDeleteCompanyReq) {
    const res = await socialApiClient.delete(`/company/delete/${data.id}`);
    return res.data;
  },
  async list(data: IGetCompaniesReq) {
    let uri = "/company/list";
    if (data.searchType) {
      uri = `/company/list?searchType=${data.searchType}&searchValue=${data.searchValue}`;
    }
    const res = await socialApiClient.get(uri);
    return res.data;
  },
};
