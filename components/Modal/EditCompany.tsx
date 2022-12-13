import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ModalContent } from "../TopNavigation/style";
import { IEditCompanyModal } from "./types";
import { REGIONS, CATEGORIES } from "../../constants";

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
            className="custom-field"
            required
            defaultValue={company?.name}
          />
          <FormControl required fullWidth className="custom-field">
            <InputLabel id="companyCategories">업체종류</InputLabel>
            <Select
              labelId="companyCategories"
              id="companyCategories"
              multiple
              value={value?.categories}
              label="companyCategories"
              onChange={handleCategoriesChange}
            >
              {CATEGORIES?.map((item: typeof CATEGORIES[0], i) => (
                <MenuItem key={i} value={item?.code}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required fullWidth className="custom-field">
            <InputLabel id="region">지역</InputLabel>
            <Select
              labelId="region"
              id="region"
              value={value.region}
              label="region"
              onChange={handleRegionChange}
            >
              {REGIONS?.map((item: typeof REGIONS[0], i) => (
                <MenuItem key={i} value={item?.code}>
                  {item?.name}
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
            className="custom-field"
            defaultValue={company?.phone}
          />
          <TextField
            id="siteUrl"
            label="업체 링크(사이트 혹은 지도)"
            variant="outlined"
            fullWidth
            className="custom-field"
            defaultValue={company?.siteUrl}
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