export interface IGetReviewsRes extends Array<any> {}
export interface IGetReviewsReq {
  searchType?: string;
  searchValue?: any;
}

export interface IGetReviewRes {
  id: number;
  name: string;
  title: string;
  content: string;
  categories: any;
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
