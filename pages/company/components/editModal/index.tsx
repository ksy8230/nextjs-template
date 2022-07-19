import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { ModalContent } from "../../../../components/TopNavigation/style";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Categories, Regions } from "../../constants";
import { IEditCompanyModal } from "../types";

const EditModal = ({
  openModal,
  onClose,
  onSubmit,
  error,
  value,
  handleRegionChange,
  handleCategoriesChange,
  company,
}: IEditCompanyModal) => {
  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent>
        <form onSubmit={onSubmit}>
          <TextField
            id="name"
            label="업체명"
            variant="outlined"
            fullWidth
            className="custom-text-field"
            required
            defaultValue={company.name}
          />
          <FormControl required fullWidth>
            <InputLabel id="companyCategories">업체종류</InputLabel>
            <Select
              labelId="companyCategories"
              id="companyCategories"
              multiple
              value={value.categories}
              label="companyCategories"
              onChange={handleCategoriesChange}
            >
              {Categories?.map((item: typeof Categories[0], i) => (
                <MenuItem key={i} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel id="region">지역</InputLabel>
            <Select
              labelId="region"
              id="region"
              value={value.region}
              label="region"
              onChange={handleRegionChange}
            >
              {Regions?.map((item: typeof Categories[0], i) => (
                <MenuItem key={i} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="phone"
            label="업체 전화번호"
            variant="outlined"
            type="tel"
            fullWidth
            className="custom-text-field"
            defaultValue={company.phone}
          />
          <TextField
            id="siteUrl"
            label="업체 링크(사이트 혹은 지도)"
            variant="outlined"
            fullWidth
            className="custom-text-field"
            defaultValue={company.siteUrl}
          />
          <Button type="submit" variant="contained" fullWidth>
            Edit
          </Button>
        </form>
        {error && <p>{error}</p>}
      </ModalContent>
    </Modal>
  );
};

export default EditModal;