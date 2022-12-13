export enum CategoryCode {
  hospital = 1,
  food = 2,
  product = 3,
}

export type TCategory = {
  code: CategoryCode.hospital | CategoryCode.food | CategoryCode.product;
};

export type TCompony = {
  id: number;
  name: string;
  categories: TCategory[];
  region: number;
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
