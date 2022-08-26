import {
  MouseEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
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
import { Categories, Regions } from "../../company/constants";
import { TableHeaderContainer } from "../../company/components/filter/style";
import * as companyActions from "../../../store/modules/componies/index";
import * as reviewActions from "../../../store/modules/reviews/index";
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { Row } from "../write/style";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { api } from "../../../api/reviews";

export default function ReviewEdit({ post }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.users);
  const { companyList } = useSelector((state: RootState) => state.companies);
  const { singleList } = useSelector((state: RootState) => state.reviews);
  const [categories, setCategories] = useState<string[]>(
    post.categories?.map((ctr: any) => ctr.code)
  ); // 업체종류 선택값
  const [region, setRegion] = useState<string | number>(post.region); // 지역 선택값
  const [text, setText] = useState(post.content);
  const [rate, setRate] = useState<number | null>(post.rate);
  const [titleValue, setTitleValue] = useState(post.title);

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & any;
    let result = (categories as string[]).map((v: string) => {
      return { code: v };
    });

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
    // dispatch(reviewActions.registerReview(form));
  };

  useEffect(() => {
    if (router.query) {
      console.log(router.query);
      dispatch(reviewActions.getSingleReview(router.query.id));
    }
  }, []);

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
        <Row>
          <Autocomplete
            freeSolo
            id="name"
            size="small"
            options={companyList}
            getOptionLabel={(option) => option.name}
            defaultValue={{ name: post.name }}
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
            value={titleValue}
            onChange={(v) => setTitleValue(v.target.value)}
            required
          />
        </Row>
        {/* 편집기 */}
        <Row>
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
            className="textfield"
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
          수정
        </Button>
      </form>
    </TableCustomContainer>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:8000/review/list");
  const reviewList = await res.json();
  const paths = reviewList.map((post: any) => ({
    params: { id: `${post.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const res = await fetch(`http://localhost:8000/review/${params.id}`);
  const post = await res.json();
  return {
    props: { post },
  };
};

ReviewEdit.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
