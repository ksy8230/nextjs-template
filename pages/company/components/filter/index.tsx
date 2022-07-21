import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Categories, FilterMainList, Regions } from "../../constants";
import { FilterCustomContainer } from "./style";

const FilterContainer = ({
  value,
  handleSearchValueChange,
  handleFilterCategoriesValueChange,
  handleFilterRegionValueChange,
  handleFilter,
  handleSearch,
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
          {FilterMainList.map((item: typeof FilterMainList[0], i) => (
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
            label="categories"
            value={value.searchValue}
            onChange={handleFilterCategoriesValueChange}
          >
            {Categories.map((item: typeof Categories[0], i) => (
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
            onChange={handleFilterRegionValueChange}
          >
            {Regions.map((item: typeof Regions[0], i) => (
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
          onChange={handleSearchValueChange}
        />
      )}

      <Button type="button" variant="contained" onClick={handleSearch}>
        검색
      </Button>
    </FilterCustomContainer>
  );
};

export default FilterContainer;
