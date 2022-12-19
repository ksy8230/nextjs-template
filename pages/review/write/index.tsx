import {
  ReactElement,
  SyntheticEvent,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../../../components/DefaultLayout";
import Button from "@mui/material/Button";
import { RootState } from "../../../store";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { TableCustomContainer } from "../../../components/Table/style";
import dynamic from "next/dynamic";
import { TCategory, TCompony } from "../../../store/modules/componies/type";
import { Row } from "../../../styles/styled-component/style";
import FilterContainer from "../../../components/Filter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  IErrorResponse,
  IGetCompaniesRes,
  KEY_COMPANY_LIST,
} from "../../../api/companies/types";
import apis from "../../../api";
import {
  IPostReviewReq,
  IPostReviewRes,
  KEY_REVIEW_LIST,
} from "../../../api/reviews/types";
import { ROUTE_PATH } from "../../../constants";
import { useRouter } from "next/router";

const NoSSREditor = dynamic(() => import("../../../components/Editor/index"), {
  ssr: false,
});

export default function Review() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.users);
  const [searchType, setSearchType] = useState(""); // 검색 카테고리 (name,categories,region,username)
  const [searchValue, setSearchValue] = useState<
    TCategory["code"][] | number | string
  >("" || []); // 검색어
  const [currentCompany, setCurrentCompany] = useState<TCompony | null>(null);
  const [step, setStep] = useState([1]);
  const editorRef = useRef<any>(null);

  const { data: companyList, refetch } = useQuery<
    IGetCompaniesRes,
    IErrorResponse
  >(
    [KEY_COMPANY_LIST, searchType, searchValue],
    () => apis.companiesApi.list({ searchType, searchValue }),
    {
      enabled: false,
    }
  );
  const { mutate: addMutate } = useMutation<
    IPostReviewRes,
    IErrorResponse,
    IPostReviewReq
  >((form) => apis.reviewsApi.register(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY_REVIEW_LIST);
      router.push(ROUTE_PATH.review);
    },
  });

  // 검색
  const handleSearch = () => {
    refetch();
    setStep([...step, 2]);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      title: { value: string };
      rate: { value: number };
    };
    if (currentCompany) {
      const form = {
        categories: currentCompany.categories,
        name: currentCompany.name,
        region: currentCompany.region,
        title: target.title.value, //
        content: editorRef?.current?.getInstance().getHTML(), //
        rate: target.rate?.value, //
        username: me?.username,
      };
      addMutate({ ...form });
    }
  };

  // 필터 > 카테고리값
  const handleSearchCategory = (event: SelectChangeEvent<string>) => {
    setSearchType(event.target.value);
  };

  // 필터 > 검색값
  const handleSearchValue = (event: SelectChangeEvent) => {
    setSearchValue(event.target.value);
  };

  const handleCompanyName = (event: ChangeEvent<HTMLInputElement>) => {
    const idx = companyList?.findIndex(
      (list) => list.name === event.target.value
    );
    if (idx || idx === 0) {
      if (companyList) {
        setCurrentCompany(companyList?.[idx]);
        setStep([...step, 3]);
      }
    }
  };

  return (
    <TableCustomContainer>
      <form onSubmit={handleSubmit}>
        {/* step1 */}
        <div className="border p-4 rounded-md mb-2">
          <div className="mb-4 text-[#555] text-sm">
            step1 리뷰를 작성할 업체 카테고리를 검색해 주세요.
          </div>
          <FilterContainer
            value={{ filter: searchType, searchValue }}
            handleFilter={handleSearchCategory}
            handleChange={handleSearchValue}
            handleSearch={handleSearch}
          />
        </div>
        {/* step2 */}
        <div
          className={`border p-4 rounded-md mb-2 ${
            step.includes(2)
              ? "opacity-100"
              : "opacity-50 pointer-events-none select-none"
          }`}
        >
          <div className="mb-4 text-[#555] text-sm">
            step2 리뷰를 작성할 업체를 선택해 주세요.
          </div>
          <TextField
            id="name"
            select
            label="업체 이름"
            value={currentCompany?.name || ""}
            onChange={handleCompanyName}
            className="min-w-full"
            size="small"
          >
            {companyList && companyList?.length > 0 ? (
              companyList.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">대상 업체가 없습니다.</MenuItem>
            )}
          </TextField>
        </div>
        <div
          className={`border p-4 rounded-md mb-2 ${
            step.includes(3)
              ? "opacity-100"
              : "opacity-50 pointer-events-none select-none"
          }`}
        >
          <div className="mb-4 text-[#555] text-sm">
            step3 리뷰를 작성해 주세요.
          </div>
          <div>
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
              <NoSSREditor content={""} editorRef={editorRef} />
            </Row>
            {/* 평점 */}
            <Row>
              <Typography component="legend">업체 리뷰 점수</Typography>
              <Rating name="rate" />
            </Row>
          </div>
        </div>

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
