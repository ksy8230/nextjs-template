import { TCompony } from "../../store/modules/componies/type";
import { socialApiClient } from "../client";
import { IGetCompaniesReq, IPutCompaniesReq } from "./types";

export const api = {
  register(data: TCompony) {
    return socialApiClient.post("/company/register/", data);
  },
  async update(data: IPutCompaniesReq) {
    console.log(data, data.id);
    const res = await socialApiClient.put(`/company/update/${data.id}`, data);
    return res.data;
  },
  delete(id: number) {
    return socialApiClient.delete(`/company/delete/${id}`);
  },
  async list(data: IGetCompaniesReq) {
    let uri = "/company/list";
    if (data.searchType) {
      uri = `/company/list?searchType=${data.searchType}&searchValue=${data.searchValue}`;
    }
    const res = await socialApiClient.get(uri);
    return res.data;
  },
  listAND(data: any) {
    let uri = "/company/listWrite";
    if (data.searchCategory) {
      uri = `/company/listWrite?searchCategory=${data.searchCategory}&searchRegion=${data.searchRegion}`;
    }
    return socialApiClient.get(uri);
  },
};
