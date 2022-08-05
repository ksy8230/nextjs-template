import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import Button from "@mui/material/Button";
import { AppDispatch, RootState } from "../../store";
import { TableCustomContainer } from "../../components/Table/style";
import Link from "next/link";
import * as reviewActions from "../../store/modules/reviews/index";
import { Row } from "./write/style";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { ReviewBox, ReviewContainer } from "./style";

export default function Review() {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewList } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(reviewActions.getReviews({ searchType: "", searchValue: "" }));
  }, []);

  return (
    <TableCustomContainer>
      <Button variant="outlined">
        <Link href="/review/write">리뷰 쓰기</Link>
      </Button>
      <ReviewContainer>
        {reviewList?.map((list: any, i: number) => (
          <ReviewBox key={i}>
            <Link href={`/review/${list.id}`}>링크</Link>
            <div className="thumb">{list.id}</div>
            <div className="info">
              <p>{list.name}</p>
              <p>{list.title}</p>
              <div className="rate">
                <Typography component="legend">업체 리뷰 점수</Typography>
                <Rating name="simple-controlled" value={list.rate} />
              </div>
            </div>
          </ReviewBox>
        ))}
      </ReviewContainer>
    </TableCustomContainer>
  );
}

Review.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
