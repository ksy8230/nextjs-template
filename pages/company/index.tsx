import { ReactElement, SyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import { RootState } from "../../store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  CategoryCode,
  TCategory,
  TCompony,
  TRegisterCompony,
} from "../../store/modules/componies/type";
import { CATEGORIES, REGIONS } from "../../constants";
import { TableCustomContainer } from "../../components/Table/style";
import { Tag } from "../../styles/styled-component/style";
import { dataFormUtil } from "../../helper";
import AddModal from "../../components/Modal/AddCompany";
import EditModal from "../../components/Modal/EditCompany";
import DeleteModal from "../../components/Modal/DeleteCompany";
import FilterContainer from "../../components/Filter";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import apis from "../../api";
import { AxiosError } from "axios";
import {
  IErrorResponse,
  IGetCompaniesRes,
  IPutCompanyRes,
  IPutCompanyReq,
  IPostCompanyRes,
  IPostCompanyReq,
  KEY_COMPANY_LIST,
  IDeleteCompanyRes,
  IDeleteCompanyReq,
} from "../../api/companies/types";

export default function Company() {
  const queryClient = useQueryClient();
  const { me } = useSelector((state: RootState) => state.users);
  const [currentCompany, setCurrentCompany] = useState<TCompony | null>(null);
  const [categories, setCategories] = useState<CategoryCode[]>([]); // 업체종류
  const [region, setRegion] = useState(1); // 지역
  const [filter, setSearchType] = useState(""); // 검색 카테고리 (name,categories,region,username)
  const [searchValue, setSearchValue] = useState<
    TCategory["code"][] | number | string
  >("" || []); // 검색어

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { data, isLoading, refetch } = useQuery<
    IGetCompaniesRes,
    IErrorResponse
  >([KEY_COMPANY_LIST], () =>
    apis.companiesApi.list({ searchType: filter, searchValue })
  );
  const { mutate: editMutate } = useMutation<
    IPutCompanyRes,
    IErrorResponse,
    IPutCompanyReq
  >((form) => apis.companiesApi.update(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY_COMPANY_LIST);
      handleCloseEdit();
    },
  });
  const { mutate: addMutate } = useMutation<
    IPostCompanyRes,
    IErrorResponse,
    IPostCompanyReq
  >((form) => apis.companiesApi.register(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY_COMPANY_LIST);
      handleCloseAdd();
    },
  });
  const { mutate: deleteMutate } = useMutation<
    IDeleteCompanyRes,
    IErrorResponse,
    IDeleteCompanyReq
  >((form) => apis.companiesApi.delete(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY_COMPANY_LIST);
      handleCloseDelete();
    },
  });

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (id: number) => {
    const idx = data?.findIndex((c) => c.id === id);
    if (idx || idx === 0) {
      const current = data?.[idx];
      if (current) {
        setCurrentCompany(current);
        setOpenEdit(true);
        setCategories(current.categories?.map((c) => c.code));
        setRegion(current.region);
        setOpenEdit(true);
      }
    }
  };
  const handleCloseEdit = () => {
    setCurrentCompany(null);
    setOpenEdit(false);
  };

  const handleOpenDelete = (id: number) => {
    const idx = data?.findIndex((c) => c.id == id);
    if (idx || idx === 0) {
      const current = data?.[idx];
      if (current) {
        setCurrentCompany(current);
        setOpenDelete(true);
      }
    }
  };
  const handleCloseDelete = () => setOpenDelete(false);

  // 추가 폼 전송
  const onSubmitAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & TRegisterCompony;
    const form = {
      name: target.name.value,
      categories: categories.map((v) => ({ code: v })),
      region: region,
      phone: target.phone?.value,
      siteUrl: target.siteUrl?.value,
    };
    addMutate({ ...form });
  };
  // 수정 폼 전송
  const onSubmitEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & TRegisterCompony;
    if (currentCompany) {
      const form = {
        id: currentCompany.id,
        name: target.name.value,
        categories: categories.map((v) => ({ code: v })),
        region: region,
        phone: target.phone?.value,
        siteUrl: target.siteUrl?.value,
        username: me?.username,
      };
      editMutate({ ...form });
    }
  };
  // 삭제 확인
  const onConfirmDelete = () =>
    currentCompany && deleteMutate({ id: currentCompany.id });

  const handleRegionChange = (event: SelectChangeEvent<number>) =>
    setRegion(event.target.value as number);

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories>
  ) => setCategories(event.target.value as TCategory["code"][]);

  // 필터 > 카테고리값
  const handleSearchCategory = (event: SelectChangeEvent<string>) => {
    setSearchType(event.target.value);
  };

  // 필터 > 검색값
  const handleSearchValue = (
    event: SelectChangeEvent<TCategory["code"][] | number | string>
  ) => {
    setSearchValue(event.target.value);
  };

  // 검색
  const handleSearch = () => refetch();

  if (isLoading) return <div>loading...</div>;
  return (
    <TableCustomContainer>
      <div className="flex mb-4">
        <FilterContainer
          value={{ filter, searchValue }}
          handleFilter={handleSearchCategory}
          handleChange={handleSearchValue}
          handleSearch={handleSearch}
        />
        <Button variant="outlined" onClick={handleOpenAdd}>
          업체 추가
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>업체명</TableCell>
              <TableCell align="left">업체종류</TableCell>
              <TableCell align="left">지역</TableCell>
              <TableCell align="left">업체 전화번호</TableCell>
              <TableCell align="left">업체 링크</TableCell>
              <TableCell align="center">등록자</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="left">
                  {row?.categories?.map((ctr: TCategory, i) => (
                    <Tag code={ctr.code} key={i}>
                      {dataFormUtil.transCode(CATEGORIES, ctr.code)}
                    </Tag>
                  ))}
                </TableCell>
                <TableCell align="left">
                  {dataFormUtil.transCode(REGIONS, row?.region)}
                </TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">
                  <a href={row.siteUrl}>icon</a>
                </TableCell>
                <TableCell align="center">{row?.username || ""}</TableCell>
                <TableCell align="center">
                  {me?.name == row?.username && (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenEdit(row.id)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenDelete(row.id)}
                      >
                        삭제
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} className="pagination-wrapper">
        <Pagination count={1} color="primary" />
      </Stack>

      <AddModal
        openModal={openAdd}
        onClose={handleCloseAdd}
        onSubmit={onSubmitAdd}
        value={{ categories, region }}
        handleRegionChange={handleRegionChange}
        handleCategoriesChange={handleCategoriesChange}
        error={""}
      />

      <EditModal
        openModal={openEdit}
        onClose={handleCloseEdit}
        onSubmit={onSubmitEdit}
        value={{ categories, region }}
        handleRegionChange={handleRegionChange}
        handleCategoriesChange={handleCategoriesChange}
        error={""}
        company={currentCompany}
      />

      <DeleteModal
        openModal={openDelete}
        onClose={handleCloseDelete}
        onSubmit={onConfirmDelete}
        error={""}
      />
    </TableCustomContainer>
  );
}

Company.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

// 상세 페이지에서 활용 가능
export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(KEY_COMPANY_LIST, () =>
    apis.companiesApi.list({ searchType: "", searchValue: "" })
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
