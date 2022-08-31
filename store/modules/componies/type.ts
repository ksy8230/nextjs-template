export type TCategory = {
  // code: string | number;
  code: any;
};

export type TCompony = {
  id?: number;
  name: string;
  categories: TCategory[];
  // region: string | number;
  region: any;
  phone?: string;
  siteUrl?: string;
  username?: string;
};

export type TRegisterCompony = {
  name: { value: string };
  categories: { value: string[] };
  // region: { value: number };
  region: { value: any };
  phone?: { value: string };
  siteUrl?: { value: string };
};

export interface ICompanyState {
  companyList: TCompony[];
  isLoading: boolean;
  error: string;
}
