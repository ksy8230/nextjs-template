import { MouseEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../../components/DefaultLayout";
import Button from "@mui/material/Button";
import { AppDispatch, RootState } from "../../../store";
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
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";

export default function Review() {
  const dispatch = useDispatch<AppDispatch>();
  const { companyList } = useSelector((state: RootState) => state.companies);
  const [categories, setCategories] = useState<string[]>([]); // 업체종류 선택값
  const [region, setRegion] = useState<string | number>(""); // 지역 선택값
  const [name, setName] = useState<string>(""); // 업체명
  const [text, setText] = useState();

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
  // 편집기 변경
  const handleChangeText = (text: any, medium: any) => {
    console.log(medium);
    setText(text);
  };

  const handleSubmit = () => {
    console.log("글쓰기");
    console.log(typeof text);
    console.log(
      "<h2><b>dfsdf</b></h2><h3>dsfsdf</h3><p>sdfsfsdf</p><p>sdfsdf</p><p>sdff sdf sdf sdfsdfsdf</p><p>sdf sd</p>"
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
        options={companyList}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="업체명"
            placeholder="업체명을 고르거나 입력해주세요"
          />
        )}
      />

      <Editor
        text={text}
        onChange={handleChangeText}
        options={{
          toolbar: {
            allowMultiParagraphSelection: true,
            buttons: [
              "bold",
              "italic",
              "underline",
              "anchor",
              "h2",
              "h3",
              "quote",
            ],
            diffLeft: 0,
            diffTop: -10,
            firstButtonClass: "medium-editor-button-first",
            lastButtonClass: "medium-editor-button-last",
            relativeContainer: null,
            standardizeSelectionStart: false,
            static: false,
            /* options which only apply when static is true */
            align: "center",
            sticky: false,
            updateOnEmptySelection: false,
          },
        }}
      />

      <Button variant="outlined" onClick={handleSubmit}>
        글쓰기
      </Button>
    </TableCustomContainer>
  );
}

Review.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
