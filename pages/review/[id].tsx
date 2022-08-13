import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/DefaultLayout";
import * as reviewActions from "../../store/modules/reviews/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Editor from "react-medium-editor";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "next/link";
import Comment from "./write/comment";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GrassIcon from "@mui/icons-material/Grass";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { ReviewDetailInfo, ReviewHeader } from "./style";

export default function DetailReview() {
  const { singleList } = useSelector((state: RootState) => state.reviews);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  console.log(router);

  useEffect(() => {
    if (router.query) {
      console.log(router.query);
      dispatch(reviewActions.getSingleReview(router.query.id));
    }
  }, []);

  return (
    <div>
      <ReviewHeader className="editor-header">
        <Button variant="outlined">
          <Link href={`/review/`}>
            <KeyboardReturnIcon />
          </Link>
        </Button>
        <Button variant="outlined">수정</Button>
      </ReviewHeader>

      <ReviewDetailInfo>
        <div className="row info">
          <div className="thumb">
            <>
              {singleList.categories?.[0]?.code === 1 ? (
                <LocalHospitalIcon className="hospital" />
              ) : singleList.categories?.[0]?.code === 2 ? (
                <GrassIcon className="grass" />
              ) : singleList.categories?.[0]?.code === 3 ? (
                <SmartToyIcon />
              ) : null}
            </>
          </div>
          <p>{singleList.name}</p>
        </div>
        <div className="row date">
          <span>{singleList.updated_at?.split("T")[0]}</span>
          <span>|</span>
          <span>{singleList.username}</span>
        </div>
        <div className="row rate">
          <Rating name="simple-controlled" value={singleList.rate} />
        </div>
      </ReviewDetailInfo>
      <h3>{singleList.title}</h3>
      <Editor
        text={singleList.content}
        options={{
          toolbar: false,
          disableEditing: true,
        }}
        className="detail-textfield"
      />
      <Comment
        reviewId={router.query.id}
        commentLists={singleList.comment_set}
      />
    </div>
  );
}

DetailReview.getLayout = function getLayout(page: ReactElement) {
  // useEffect(() => {
  //   dispatch(reviewActions.getReviews({ searchType: "", searchValue: "" }));
  // }, []);
  return <DefaultLayout>{page}</DefaultLayout>;
};
