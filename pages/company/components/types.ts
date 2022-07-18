import { SelectChangeEvent } from "@mui/material";
import { ISubmitFormModal } from "../../../components/TopNavigation/components/types";

export interface IAddCompanyModal extends ISubmitFormModal {
  value: { categories: string[]; region: number };
  handleRegionChange: (e: SelectChangeEvent<number>) => void;
  handleCategoriesChange: (e: SelectChangeEvent<string[]>) => void;
}
