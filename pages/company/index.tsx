import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import { AppDispatch, RootState } from "../../store";
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
import * as companyActions from "../../store/modules/componies/index";
import { CATEGORIES, REGIONS } from "../../constants";
import { TableCustomContainer } from "../../components/Table/style";
import { TableHeaderContainer } from "../../components/Filter/style";
import { Tag } from "../../styles/styled-component/style";
import { dataFormUtil } from "../../helper";
import AddModal from "../../components/Modal/AddCompany";
import EditModal from "../../components/Modal/EditCompany";
import DeleteModal from "../../components/Modal/DeleteCompany";
import FilterContainer from "../../components/Filter";

export default function Company() {
  const dispatch = useDispatch<AppDispatch>();
  const { me } = useSelector((state: RootState) => state.users);
  const { companyList } = useSelector((state: RootState) => state.companies);
  const [currentCompany, setCurrentCompany] = useState<TCompony | null>(null);
  const [categories, setCategories] = useState<CategoryCode[]>([]); // 업체종류 선택값
  const [region, setRegion] = useState(1); // 지역 선택값
  const [filter, setFilter] = useState(""); // 필터 선택값
  const [searchValue, setSearchValue] = useState<any>(null); // 검색어 값

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (id: number) => {
    const idx = companyList.findIndex((c) => c.id == id);
    const current = companyList[idx];
    setCurrentCompany(current);
    setOpenEdit(true);
    setCategories(current.categories?.map((c) => c.code));
    setRegion(current.region);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setCurrentCompany(null);
    setOpenEdit(false);
  };

  const handleOpenDelete = (id: number) => {
    const idx = companyList.findIndex((c) => c.id == id);
    const current = companyList[idx];
    setCurrentCompany(current);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  // 추가 폼 전송
  const onSubmitAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & TRegisterCompony;
    let result = categories.map((v) => ({ code: v }));
    const form = {
      name: target.name.value,
      categories: result,
      region: region,
      phone: target.phone?.value,
      siteUrl: target.siteUrl?.value,
    };
    console.log(form);
    // dispatch(companyActions.registerCompany(form));
  };
  // 수정 폼 전송
  const onSubmitEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & TRegisterCompony;
    let result = categories.map((v) => ({ code: v }));

    if (currentCompany) {
      const form = {
        id: currentCompany.id,
        name: target.name.value,
        categories: result,
        region: region,
        phone: target.phone?.value,
        siteUrl: target.siteUrl?.value,
        username: me?.username,
      };
      dispatch(
        companyActions.updateCompany({ data: form, id: currentCompany.id })
      );
    }
  };
  // 삭제 확인
  const onConfirmDelete = () => {
    currentCompany && dispatch(companyActions.deleteCompany(currentCompany.id));
  };

  const handleRegionChange = (event: SelectChangeEvent<number>) =>
    setRegion(event.target.value as number);

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories>
  ) => setCategories(event.target.value as TCategory["code"][]);

  // 필터 > 대표 필터 검색
  const handleFilter = (event: SelectChangeEvent<string>) =>
    setFilter(event.target.value);

  // 필터 > 업체종류 검색
  const handleFilterCategoriesValueChange = (
    event: SelectChangeEvent<typeof categories>
  ) => {
    setSearchValue(event.target.value as TCategory["code"][]);
  };

  // 필터 > 지역 검색
  const handleFilterRegionValueChange = (event: SelectChangeEvent<number>) =>
    setSearchValue(event.target.value);

  // 필터 > 검색어
  const handleSearchValueChange = (event: SelectChangeEvent<string>) =>
    setSearchValue(event.target.value);

  // 검색
  const handleSearch = () => {
    dispatch(
      companyActions.getCompanies({
        searchType: filter,
        searchValue: searchValue, // ex. [1,2,3]
      })
    );
  };

  useEffect(() => {
    dispatch(
      companyActions.getCompanies({
        searchType: filter,
        searchValue,
      })
    );
  }, []);

  return (
    <TableCustomContainer>
      <TableHeaderContainer>
        <FilterContainer
          value={{ filter, searchValue }}
          handleFilter={handleFilter}
          handleFilterCategoriesValueChange={handleFilterCategoriesValueChange}
          handleFilterRegionValueChange={handleFilterRegionValueChange}
          handleSearchValueChange={handleSearchValueChange}
          handleSearch={handleSearch}
        />
        <Button variant="outlined" onClick={handleOpenAdd}>
          추가
        </Button>
      </TableHeaderContainer>

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
            {companyList?.map((row, i) => (
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
