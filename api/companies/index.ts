import { TCompony } from "../../store/modules/componies/type";
import { socialApiClient } from "../client";

export const api = {
  register(data: TCompony) {
    return socialApiClient.post("/company/register/", data);
  },
  update(data: any, id: any) {
    return socialApiClient.put(`/company/update/${id}`, data);
  },
  list() {
    return socialApiClient.get("/company/list/");
  },
};
