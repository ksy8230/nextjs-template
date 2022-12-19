import { socialApiClient } from "../client";
import {
  IGetReviewReq,
  IGetReviewsReq,
  IPostReviewReq,
  IPutReviewReq,
} from "./types";

export const api = {
  async register(data: IPostReviewReq) {
    const res = await socialApiClient.post("/review/register/", data);
    return res.data;
  },
  async update(data: IPutReviewReq) {
    const res = await socialApiClient.put(
      `/review/update/${data.id}/`,
      data.data
    );
    return res.data;
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
