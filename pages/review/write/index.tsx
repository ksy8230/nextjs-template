import { ReactElement, SyntheticEvent, useRef, useState } from "react";
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
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { TableCustomContainer } from "../../../components/Table/style";
import { TableHeaderContainer } from "../../../components/Filter/style";
import * as companyActions from "../../../store/modules/componies/index";
import * as reviewActions from "../../../store/modules/reviews/index";
import { Editor as ToastEditor } from "@toast-ui/react-editor";
// import { Row } from "./style";
import dynamic from "next/dynamic";
import { CategoryCode, TCategory } from "../../../store/modules/componies/type";
import { CATEGORIES, REGIONS } from "../../../constants";
import { Row } from "../../../styles/styled-component/style";
const Editor = dynamic(() => import("../../../components/Editor/index"), {
  ssr: false,
});

export default function Review() {
  const dispatch = useDispatch<AppDispatch>();
  const editorRef = useRef<ToastEditor>(null);
  const { me } = useSelector((state: RootState) => state.users);
  const { companyList } = useSelector((state: RootState) => state.companies);
  const [categories, setCategories] = useState<CategoryCode[]>([]); // 업체종류 선택값
  const [region, setRegion] = useState<any>(""); // 지역 선택값
  const [text, setText] = useState("");
  const [rate, setRate] = useState<number | null>(2);

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories>
  ) => setCategories(event.target.value as TCategory["code"][]);

  const handleRegionChange = (event: SelectChangeEvent<any>) =>
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
  const onChange = () => {
    if (editorRef.current) {
      const data = editorRef.current.getInstance().getHTML();
      console.log(data);
      setText(data);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & any;
    let result = categories.map((v) => ({ code: v }));

    const form = {
      categories: result,
      name: target.name.value,
      region: region,
      title: target.title.value,
      content: text,
      rate: rate,
      username: me?.username,
    };
    console.log(form);
    dispatch(reviewActions.registerReview(form));
  };

  return (
    <TableCustomContainer>
      <form onSubmit={handleSubmit}>
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
              {CATEGORIES?.map((item: typeof CATEGORIES[0], i) => (
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
              {REGIONS?.map((item: typeof REGIONS[0], i) => (
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
        <Row>
          <Autocomplete
            freeSolo
            id="name"
            size="small"
            options={companyList}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="업체명"
                placeholder="업체명을 고르거나 입력해주세요"
                required
              />
            )}
          />
        </Row>
        {/* 제목 */}
        <Row>
          <TextField
            id="title"
            label="제목"
            variant="outlined"
            fullWidth
            className="custom-field"
            size="small"
            required
          />
        </Row>
        {/* 편집기 */}
        <Row>
          <Editor
            editorRef={editorRef}
            text={"내용을 적어주세요!"}
            onChange={onChange}
          />
        </Row>
        {/* 평점 */}
        <Row>
          <Typography component="legend">업체 리뷰 점수</Typography>
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </Row>
        <Button variant="outlined" type="submit">
          글쓰기
        </Button>
      </form>
    </TableCustomContainer>
  );
}

Review.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
