import { SyntheticEvent } from "react";

export interface TModal {
  openModal: boolean;
  onClose: () => void;
}

export interface ISubmitFormModal extends TModal {
  onSubmit: (e: SyntheticEvent) => void;
}
