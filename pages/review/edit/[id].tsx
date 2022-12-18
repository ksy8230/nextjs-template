import {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../../components/DefaultLayout";
import { AppDispatch, RootState } from "../../../store";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { TableCustomContainer } from "../../../components/Table/style";
import * as companyActions from "../../../store/modules/componies/index";
import * as reviewActions from "../../../store/modules/reviews/index";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { requestFetch } from "../../../api/types";
import { IReview } from "../../../store/modules/reviews/type";
import { TCategory } from "../../../store/modules/componies/type";
import { CATEGORIES, REGIONS } from "../../../constants";
import { Row } from "../../../styles/styled-component/style";
import { useQuery } from "react-query";
import apis from "../../../api";
import { IGetReviewRes } from "../../../api/reviews/types";
import { IErrorResponse } from "../../../api/companies/types";

const NoSSREditor = dynamic(() => import("../../../components/Editor/index"), {
  ssr: false,
});

export default function ReviewEdit(props: IReview) {
  const dispatch = useDispatch<AppDispatch>();
  // const editorRef = useRef<ToastEditor>(null);
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.users);
  const { companyList } = useSelector((state: RootState) => state.companies);
  const [categories, setCategories] = useState(
    props.categories?.map((ctr) => ctr.code)
  ); // 업체종류
  const [region, setRegion] = useState(props.region); // 지역
  const [companyName, setCompanyName] = useState(props.name); // 업체명
  const [title, setTitle] = useState(props.title); // 제목
  const [content, setContent] = useState(props.content); // 내용
  const [rate, setRate] = useState<number>(props.rate); // 평점
  const editorRef = useRef<any>(null);

  // 검색
  const handleSearch = () => {
    // dispatch(
    //   companyActions.getCompaniesAND({
    //     searchCategory: categories,
    //     searchRegion: region,
    //   })
    // );
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let result = categories.map((v) => ({ code: v }));

    const form = {
      categories: result,
      name: companyName,
      region,
      title,
      content,
      rate,
      username: me?.username,
    };

    dispatch(reviewActions.updateReview({ data: form, id: props.id }));
  };

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories>
  ) => setCategories(event.target.value as TCategory["code"][]);

  const handleRegionChange = (event: SelectChangeEvent<number>) =>
    setRegion(event.target.value as number);

  const onChangeCompanyName = (e: SyntheticEvent, newValue: string | null) => {
    newValue && setCompanyName(newValue);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // const onChangeEditor = () => {
  //   if (editorRef.current) {
  //     const data = editorRef.current.getInstance().getHTML();
  //     setContent(data);
  //   }
  // };

  const onChangeRate = (e: SyntheticEvent, newValue: number | null) => {
    newValue && setRate(newValue);
  };

  // useEffect(() => {
  //   router.query && dispatch(reviewActions.getSingleReview(router.query.id));
  // }, []);

  const {
    data: singleList,
    isLoading,
    refetch,
  } = useQuery<IGetReviewRes, IErrorResponse>(["review", router], () =>
    apis.reviewsApi.singleList({ id: router.query.id })
  );

  return (
    <TableCustomContainer>
      <form onSubmit={handleSubmit}>
        {/* 업체 종류, 지역 */}
        <div className="flex">
          <FormControl required fullWidth className="custom-field" size="small">
            <InputLabel id="companyCategories">업체종류</InputLabel>
            <Select
              labelId="companyCategories"
              id="companyCategories"
              multiple
              value={categories || []}
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
          <Button type="button" variant="outlined" onClick={handleSearch}>
            검색
          </Button>
        </div>
        {/* 업체명 */}
        <Row>
          <Autocomplete
            freeSolo
            id="name"
            size="small"
            options={companyList.map((list) => list.name)}
            getOptionLabel={(option) => option}
            defaultValue={props.name}
            onChange={onChangeCompanyName}
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
            value={singleList?.title}
            onChange={onChangeTitle}
            required
          />
        </Row>
        {/* 편집기 */}
        <Row>
          {singleList?.content && (
            <NoSSREditor content={singleList?.content} editorRef={editorRef} />
          )}
        </Row>
        {/* 평점 */}
        <Row>
          <Typography component="legend">업체 리뷰 점수</Typography>
          <Rating
            name="rate"
            value={singleList?.rate}
            onChange={onChangeRate}
          />
        </Row>
        <Button variant="outlined" type="submit">
          수정
        </Button>
      </form>
    </TableCustomContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const reviewList = await requestFetch<IReview[]>(
    `http://localhost:8000/review/list`
  );
  const paths = reviewList.map((post) => ({
    params: { id: `${post.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as any;
  try {
    const review = await requestFetch<IReview>(
      `http://localhost:8000/review/${id}`
    );
    return {
      props: review,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
    };
  }
};

ReviewEdit.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
