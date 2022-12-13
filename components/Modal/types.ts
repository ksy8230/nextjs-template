import { SelectChangeEvent } from "@mui/material";
import { CategoryCode } from "../../store/modules/componies/type";
import { ISubmitFormModal } from "../TopNavigation/components/types";

export interface IAddCompanyModal extends ISubmitFormModal {
  value: { categories: CategoryCode[]; region: number };
  handleRegionChange: (e: SelectChangeEvent<number>) => void;
  handleCategoriesChange: (e: SelectChangeEvent<CategoryCode[]>) => void;
}

export interface IEditCompanyModal extends ISubmitFormModal {
  value: { categories: CategoryCode[]; region: number };
  handleRegionChange: (e: SelectChangeEvent<number>) => void;
  handleCategoriesChange: (e: SelectChangeEvent<CategoryCode[]>) => void;
  company: any;
}
