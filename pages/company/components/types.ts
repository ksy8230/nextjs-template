import { SelectChangeEvent } from "@mui/material";
import { ISubmitFormModal } from "../../../components/TopNavigation/components/types";
import { IUser } from "../../../store/modules/users/type";

export interface IAddCompanyModal extends ISubmitFormModal {
  value: { categories: string[]; region: number };
  handleRegionChange: (e: SelectChangeEvent<number>) => void;
  handleCategoriesChange: (e: SelectChangeEvent<string[]>) => void;
}

export interface IEditCompanyModal extends ISubmitFormModal {
  value: { categories: string[]; region: number };
  handleRegionChange: (e: SelectChangeEvent<number>) => void;
  handleCategoriesChange: (e: SelectChangeEvent<string[]>) => void;
  company: any;
}
