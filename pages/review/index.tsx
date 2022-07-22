import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import Button from "@mui/material/Button";
import { AppDispatch } from "../../store";
import { TableCustomContainer } from "../../components/Table/style";
import Link from "next/link";

export default function Review() {
  const dispatch = useDispatch<AppDispatch>();
  const counter = useSelector(({ counter }: any) => counter);

  return (
    <TableCustomContainer>
      <Button variant="outlined">
        <Link href="/review/write">리뷰 쓰기</Link>
      </Button>
    </TableCustomContainer>
  );
}

Review.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
