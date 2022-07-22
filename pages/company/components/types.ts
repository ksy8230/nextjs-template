import { SelectChangeEvent } from "@mui/material";
import { ISubmitFormModal } from "../../../components/TopNavigation/components/types";

export interface IAddCompanyModal extends ISubmitFormModal {
  value: { categories: string[]; region: number | string };
  handleRegionChange: (e: SelectChangeEvent<number | string>) => void;
  handleCategoriesChange: (e: SelectChangeEvent<string[]>) => void;
}

export interface IEditCompanyModal extends ISubmitFormModal {
  value: { categories: string[]; region: number | string };
  handleRegionChange: (e: SelectChangeEvent<number>) => void;
  handleCategoriesChange: (e: SelectChangeEvent<string[]>) => void;
  company: any;
}
