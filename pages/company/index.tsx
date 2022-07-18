import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import { AppDispatch } from "../../store";
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
import { TCompony } from "../../store/modules/componies/type";
import * as companyActions from "../../store/modules/componies/index";

function createData(
  companyName: string,
  companyCategories: number,
  region: number,
  phone: string,
  siteUrl: string,
  writer: string
) {
  return { companyName, companyCategories, region, phone, siteUrl, writer };
}

const rows = [
  createData("차오름병원", 1, 1, "02 - 1244 - 114", "www.naver.com", "ksy"),
  createData("테스트", 2, 2, "02 - 1244 - 114", "www.naver.com", "admin"),
];

export default function Company() {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector(({ counter }: any) => counter);
  const [categories, setCategories] = useState<string[]>([]); // 카테고리 선택값
  const [region, setRegion] = useState(1); // 지역 선택값

  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  // 추가 폼 전송
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & TCompony;
    const form = {
      name: target.companyName.value,
      categories: categories,
      region: region,
      phone: target.phone?.value,
      siteUrl: target.siteUrl?.value,
    };
    console.log(form);
    dispatch(companyActions.registerCompany(form));
  };

  const handleRegionChange = (event: SelectChangeEvent<number>) => {
    setRegion(event.target.value as number);
  };
  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof categories>
  ) => {
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
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.companyName}
                </TableCell>
                <TableCell align="left">{row.companyCategories}</TableCell>
                <TableCell align="left">{row.region}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">
                  <a href={row.siteUrl}>icon</a>
                </TableCell>
                <TableCell align="center">{row.writer}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined">수정</Button>
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
        onSubmit={onSubmit}
        value={{ categories, region }}
        handleRegionChange={handleRegionChange}
        handleCategoriesChange={handleCategoriesChange}
        // isRegistered={isRegistered}
        error={""}
      />
    </div>
  );
}

Company.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
