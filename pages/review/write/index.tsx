import { MouseEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../../components/DefaultLayout";
import Button from "@mui/material/Button";
import { AppDispatch } from "../../../store";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TableCustomContainer } from "../../../components/Table/style";
import { Categories, Regions } from "../../company/constants";
import { TableHeaderContainer } from "../../company/components/filter/style";
import * as companyActions from "../../../store/modules/componies/index";

export default function Review() {
  const dispatch = useDispatch<AppDispatch>();
  const counter = useSelector(({ counter }: any) => counter);
  const [categories, setCategories] = useState<string[]>([]); // 업체종류 선택값
  const [region, setRegion] = useState<string | number>(""); // 지역 선택값
  const [name, setName] = useState<string>(""); // 업체명

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories | string>
  ) => {
    setCategories(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };
  const handleRegionChange = (event: SelectChangeEvent<string | number>) =>
    setRegion(event.target.value);
  // 검색
  const handleSearch = () => {
    console.log(categories, region);
    dispatch(
      companyActions.getCompaniesAND({
        searchCategory: categories,
        searchRegion: region,
      })
    );
  };

  return (
    <TableCustomContainer>
      {/* 업체 종류, 지역 */}
      <TableHeaderContainer>
        <FormControl required fullWidth className="custom-field" size="small">
          <InputLabel id="companyCategories">업체종류</InputLabel>
          <Select
            labelId="companyCategories"
            id="companyCategories"
            multiple
            value={categories}
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
        <FormControl required fullWidth className="custom-field" size="small">
          <InputLabel id="region">지역</InputLabel>
          <Select
            labelId="region"
            id="region"
            value={region}
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

        <Button type="button" variant="contained" onClick={handleSearch}>
          검색
        </Button>
      </TableHeaderContainer>
      {/* 업체명 */}
      <Autocomplete
        id="size-small-outlined"
        size="small"
        options={["업체명1", "업체명2", "업체명3"]}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="업체명"
            placeholder="업체명을 고르거나 입력해주세요"
          />
        )}
      />

      <Button variant="outlined" onClick={() => {}}>
        글쓰기
      </Button>
    </TableCustomContainer>
  );
}

Review.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
