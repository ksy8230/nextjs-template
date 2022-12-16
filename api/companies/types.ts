import { TCompony } from "../../store/modules/componies/type";

export interface IGetCompaniesRes extends Array<TCompony> {}

export interface IGetCompaniesReq {
  searchType?: string;
  searchValue?: any;
}

export interface IPutCompaniesRes {
  id: number;
  name: string;
  categories: any;
  region: number;
  phone?: string;
  siteUrl?: string;
  username: string;
}

export interface IPutCompaniesReq {
  id: number;
  name: string;
  categories: any;
  region: number;
  phone?: string;
  siteUrl?: string;
  username: string;
}

export interface IErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
