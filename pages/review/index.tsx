import { ReactElement } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import Button from "@mui/material/Button";
import { RootState } from "../../store";
import { TableCustomContainer } from "../../components/Table/style";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import GrassIcon from "@mui/icons-material/Grass";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import {
  ReviewBox,
  ReviewContainer,
} from "../../styles/styled-component/style";
import { IGetReviewsRes, KEY_REVIEW_LIST } from "../../api/reviews/types";
import { IErrorResponse } from "../../api/companies/types";
import { useQuery } from "react-query";
import apis from "../../api";
import { IconHeart } from "../../components/Icon";

export default function Review() {
  // const { reviewList } = useSelector((state: RootState) => state.reviews);

  const { data, isLoading, refetch } = useQuery<IGetReviewsRes, IErrorResponse>(
    [KEY_REVIEW_LIST],
    () => apis.reviewsApi.list({ searchType: "", searchValue: "" })
  );

  if (isLoading) return <div>loading...</div>;
  return (
    <TableCustomContainer>
      <div className="text-right mb-4">
        <Button variant="outlined">
          <Link href="/review/write">리뷰 쓰기</Link>
        </Button>
      </div>
      <ReviewContainer>
        {data?.map((list, i) => (
          <ReviewBox key={i}>
            <Link href={`/review/${list.id}`}>링크</Link>
            <div className="content">
              <div className="thumb">
                <>
                  {list.categories?.[0]?.code === 1 ? (
                    <IconHeart />
                  ) : list.categories?.[0]?.code === 2 ? (
                    <GrassIcon className="grass" />
                  ) : list.categories?.[0]?.code === 3 ? (
                    <SmartToyIcon />
                  ) : null}
                </>
              </div>
              <div className="info">
                <p className="name">{list.name}</p>
                <p>{list.title}</p>
                <div className="rate">
                  <Rating name="simple-controlled" value={list.rate} />
                </div>
              </div>
            </div>
            <div className="user">
              <PersonIcon />
              <p>{list.username}</p>
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
