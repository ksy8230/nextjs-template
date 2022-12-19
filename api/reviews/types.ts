import { TCategory } from "../../store/modules/componies/type";

export const KEY_REVIEW = "review";
export const KEY_REVIEW_LIST = "reviews";

export interface IGetReviewsRes extends Array<any> {} // todo
export interface IGetReviewsReq {
  searchType?: string;
  searchValue?: any;
}

export interface IGetReviewRes {
  id: number;
  name: string;
  title: string;
  content: string;
  categories: TCategory[];
  comment_count: number;
  comment_set: any;
  rate: number;
  region: number;
  updated_at: string;
  username: string;
}
export interface IGetReviewReq {
  id: any;
}

export interface IPutReviewRes {} // todo
export interface IPutReviewReq extends IGetReviewReq {
  data: {
    categories: TCategory[];
    name: string;
    region: number;
    title: string;
    content: string;
    rate: number;
    username: string;
  };
}

export interface IPostReviewRes {} // todo
export interface IPostReviewReq {
  categories: TCategory[];
  name: string;
  region: number;
  title: string;
  content: string;
  rate: number;
  username: string;
}
