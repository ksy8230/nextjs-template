import { socialApiClient } from "../client";
import { IGetReviewReq, IGetReviewsReq } from "./types";

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
  async list(data: IGetReviewsReq) {
    let uri = "/review/list";
    if (data.searchType) {
      uri = `/review/list?searchType=${data.searchType}&searchValue=${data.searchValue}`;
    }
    const res = await socialApiClient.get(uri);
    return res.data;
  },
  async singleList(data: IGetReviewReq) {
    console.log(data.id);
    const res = await socialApiClient.get(`/review/${data.id}`);
    return res.data;
  },

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
