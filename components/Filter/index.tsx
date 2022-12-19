import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FilterCustomContainer } from "./style";
import { CATEGORIES, FILTER_MAIN_LIST, REGIONS } from "../../constants";
import { IconSearch } from "../Icon";

const FilterContainer = ({
  value,
  handleFilter,
  handleSearch,
  handleChange,
}: any) => {
  return (
    <FilterCustomContainer>
      <FormControl fullWidth className="custom-control" size="small">
        <InputLabel id="filter">필터</InputLabel>
        <Select
          labelId="filter"
          id="filter"
          value={value.filter}
          label="filter"
          onChange={handleFilter}
        >
          {FILTER_MAIN_LIST.map((item: typeof FILTER_MAIN_LIST[0], i) => (
            <MenuItem key={i} value={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {value.filter === "categories" ? (
        <FormControl fullWidth className="custom-control" size="small">
          <InputLabel id="categories">업체종류</InputLabel>
          <Select
            labelId="categories"
            id="categories"
            multiple
            label="categories"
            value={value.searchValue}
            onChange={handleChange}
          >
            {CATEGORIES.map((item: typeof CATEGORIES[0], i) => (
              <MenuItem key={i} value={item.code}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : value.filter === "region" ? (
        <FormControl fullWidth className="custom-control" size="small">
          <InputLabel id="region">지역</InputLabel>
          <Select
            labelId="region"
            id="region"
            label="region"
            value={value.searchValue}
            onChange={handleChange}
          >
            {REGIONS &&
              REGIONS.map((item: typeof REGIONS[0], i) => (
                <MenuItem key={i} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          id="searchValue"
          label="검색어"
          variant="outlined"
          fullWidth
          className="custom-control"
          size="small"
          onChange={handleChange}
        />
      )}

      <Button type="button" onClick={handleSearch}>
        <IconSearch />
      </Button>
    </FilterCustomContainer>
  );
};

export default FilterContainer;
