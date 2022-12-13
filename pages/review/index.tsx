import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import Button from "@mui/material/Button";
import { AppDispatch, RootState } from "../../store";
import { TableCustomContainer } from "../../components/Table/style";
import Link from "next/link";
import * as reviewActions from "../../store/modules/reviews/index";
import Rating from "@mui/material/Rating";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GrassIcon from "@mui/icons-material/Grass";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import {
  ReviewBox,
  ReviewContainer,
} from "../../styles/styled-component/style";

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
            <div className="content">
              <div className="thumb">
                <>
                  {list.categories?.[0]?.code === 1 ? (
                    <LocalHospitalIcon className="hospital" />
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
                  {/* <Typography component="legend">업체 리뷰 점수</Typography> */}
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
