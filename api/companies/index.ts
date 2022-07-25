import { TCompony } from "../../store/modules/componies/type";
import { socialApiClient } from "../client";

export const api = {
  register(data: TCompony) {
    return socialApiClient.post("/company/register/", data);
  },
  update(data: any, id: number) {
    return socialApiClient.put(`/company/update/${id}`, data);
  },
  delete(id: number) {
    return socialApiClient.delete(`/company/delete/${id}`);
  },
  list(data: any) {
    console.log(data);
    let uri = "/company/list";
    if (data.searchType) {
      uri = `/company/list?searchType=${data.searchType}&searchValue=${data.searchValue}`;
    }
    return socialApiClient.get(uri);
  },
  listAND(data: any) {
    console.log(data);
    let uri = "/company/listWrite";
    if (data.searchCategory) {
      uri = `/company/listWrite?searchCategory=${data.searchCategory}&searchRegion=${data.searchRegion}`;
    }
    return socialApiClient.get(uri);
  },
};
