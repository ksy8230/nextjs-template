import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import { AppDispatch, RootState } from "../../store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddModal from "./components/addModal";
import { SelectChangeEvent } from "@mui/material";
import {
  TCategory,
  TRegisterCompony,
} from "../../store/modules/componies/type";
import * as companyActions from "../../store/modules/componies/index";
import { transCode } from "./helper";
import { Categories, Regions } from "./constants";
import EditModal from "./components/editModal";

export default function Company() {
  const dispatch = useDispatch<AppDispatch>();
  const { me } = useSelector((state: RootState) => state.users);
  const { companyList } = useSelector((state: RootState) => state.companies);
  const [currentCompany, setCurrentCompany] = useState({});
  const [categories, setCategories] = useState<number[]>([]); // 카테고리 선택값
  const [region, setRegion] = useState(0); // 지역 선택값

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = (id: number | undefined) => {
    const idx = companyList.findIndex((c) => c.id == id);
    const current = companyList[idx];
    setCurrentCompany(current);
    setOpenEdit(true);
    setCategories(current.categories?.map((c) => c.code));
    setRegion(current.region);
  };
  const handleCloseEdit = () => {
    setCurrentCompany({});
  };

  useEffect(() => {
    if (Object.keys(currentCompany).length) {
      console.log("뭔가 있음");
      setOpenEdit(true);
    } else {
      console.log("뭔가 없음");
      setOpenEdit(false);
    }
  }, [currentCompany]);

  // 추가 폼 전송
  const onSubmitAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & TRegisterCompony;
    let result = (categories as string[]).map((v: string) => {
      return { code: v };
    });
    const form = {
      name: target.name.value,
      categories: result,
      region: region,
      phone: target.phone?.value,
      siteUrl: target.siteUrl?.value,
      username: me?.username,
    };
    console.log(form);
    dispatch(companyActions.registerCompany(form));
  };
  // 수정 폼 전송
  const onSubmitEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & TRegisterCompony;
    let result = (categories as number[]).map((v: number) => {
      return { code: v };
    });
    const form = {
      name: target.name.value,
      categories: result,
      region: region,
      phone: target.phone?.value,
      siteUrl: target.siteUrl?.value,
      username: me?.username,
    };
    console.log(form);
    console.log(currentCompany);
    dispatch(companyActions.updateCompany({ data: form, id: 1 }));
  };

  const handleRegionChange = (event: SelectChangeEvent<number>) => {
    setRegion(event.target.value as number);
  };
  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories>
  ) => {
    console.log(event.target.value);

    setCategories(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };

  useEffect(() => {
    dispatch(companyActions.getCompanies());
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenAdd}>
        추가
      </Button>
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
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  {row.categories?.map((ctr: TCategory, i) => (
                    <span key={i}>{transCode(Categories, ctr.code)}</span>
                  ))}
                </TableCell>
                <TableCell align="left">
                  {transCode(Regions, row.region)}
                </TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">
                  <a href={row.siteUrl}>icon</a>
                </TableCell>
                <TableCell align="center">{row.username || ""}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenEdit(row.id)}
                  >
                    수정
                  </Button>
                  <Button variant="outlined">삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </div>
  );
}

Company.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
