import { SyntheticEvent } from "react";
import { IUser } from "../../../store/modules/users/type";

export interface TModal {
  openModal: boolean;
  onClose: () => void;
}

export interface ISubmitFormModal extends TModal {
  onSubmit: (e: SyntheticEvent) => void;
  error: string;
}

export interface IRegisterModal extends ISubmitFormModal {
  isRegistered: boolean;
}

export interface IUserEditModal extends ISubmitFormModal {
  isEdited: boolean;
  user: IUser;
}
