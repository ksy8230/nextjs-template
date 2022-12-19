import { TCategory, TCompony } from "../../store/modules/componies/type";

export const KEY_COMPANY_LIST = "companies";

export interface IGetCompaniesRes extends Array<TCompony> {}
export interface IGetCompaniesReq {
  searchType?: string;
  searchValue?: any;
}

export interface IPostCompanyRes extends IPutCompanyRes {}
export interface IPostCompanyReq {
  name: string;
  categories: TCategory[];
  region: number;
  phone?: string;
  siteUrl?: string;
}

export interface IPutCompanyRes {
  id: number;
  name: string;
  categories: TCategory[];
  region: number;
  phone?: string;
  siteUrl?: string;
  username: string;
}
export interface IPutCompanyReq {
  id: number;
  name: string;
  categories: TCategory[];
  region: number;
  phone?: string;
  siteUrl?: string;
  username: string;
}

export interface IDeleteCompanyRes {}
export interface IDeleteCompanyReq {
  id: number;
}

export interface IErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
