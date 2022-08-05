import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/DefaultLayout";
import * as reviewActions from "../../store/modules/reviews/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Editor from "react-medium-editor";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import Comment from "./write/comment";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GrassIcon from "@mui/icons-material/Grass";
import SmartToyIcon from "@mui/icons-material/SmartToy";

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
      <Link href={`/review/`}>
        <KeyboardReturnIcon />
      </Link>
      <div className="info">
        <div className="row">
          <div>
            <>
              {singleList.categories?.[0]?.code === 1 ? (
                <LocalHospitalIcon />
              ) : singleList.categories?.[0]?.code === 2 ? (
                <GrassIcon />
              ) : singleList.categories?.[0]?.code === 3 ? (
                <SmartToyIcon />
              ) : null}
            </>
          </div>
          <p>{singleList.name}</p>
        </div>
        <div className="row">
          <span>{singleList.updated_at?.split("T")[0]}</span>
          <span>|</span>
          <span>{singleList.username}</span>
        </div>
        <div className="row">
          <Rating name="simple-controlled" value={singleList.rate} />
        </div>
      </div>
      <h3>{singleList.title}</h3>
      <Editor
        text={singleList.content}
        options={{
          toolbar: false,
          disableEditing: true,
        }}
        className="detail-textfield"
      />
      <Comment />
    </div>
  );
}

DetailReview.getLayout = function getLayout(page: ReactElement) {
  // useEffect(() => {
  //   dispatch(reviewActions.getReviews({ searchType: "", searchValue: "" }));
  // }, []);
  return <DefaultLayout>{page}</DefaultLayout>;
};
