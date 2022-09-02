// import { TCompony } from "../../store/modules/componies/type";
import { socialApiClient } from "../client";

export const api = {
  register(data: any) {
    return socialApiClient.post("/review/register/", data);
  },
  update(data: any, id: number) {
    return socialApiClient.put(`/review/update/${id}/`, data);
  },
  delete(id: string) {
    return socialApiClient.delete(`/review/delete/${id}/`);
  },
  list(data: any) {
    console.log(data);
    let uri = "/review/list";
    if (data.searchType) {
      uri = `/review/list?searchType=${data.searchType}&searchValue=${data.searchValue}`;
    }
    return socialApiClient.get(uri);
  },
  singleList(id: string) {
    console.log(id);
    return socialApiClient.get(`/review/${id}`);
  },
  // listAND(data: any) {
  //   console.log(data);
  //   let uri = "/company/listWrite";
  //   if (data.searchCategory) {
  //     uri = `/company/listWrite?searchCategory=${data.searchCategory}&searchRegion=${data.searchRegion}`;
  //   }
  //   return socialApiClient.get(uri);
  // },
  registerComment(data: any) {
    return socialApiClient.post(`/review/${data.id}/comments/`, data.data);
  },
  updateComment(data: any) {
    return socialApiClient.put(
      `/review/comments/${data.commentId}/`,
      data.data
    );
  },
  deleteComment(data: any) {
    return socialApiClient.delete(`/review/comments/delete/${data.commentId}/`);
  },
};
