export type TCompony = {
  companyName: { value: string };
  companyCategories: { value: string[] };
  region: { value: number };
  phone?: { value: string };
  siteUrl?: { value: string };
};

export interface ICompanyState {
  companyList: TCompony[] | null;
  isLoading: boolean;
  error: string;
}
