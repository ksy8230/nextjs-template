import React, { ReactElement, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "next/link";
import Comment from "./comment";
import GrassIcon from "@mui/icons-material/Grass";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  IconArrowRightSmall,
  IconCalendarSmall,
  IconHeart,
  IconUserSmall,
} from "../../components/Icon";
import apis from "../../api";
import { useQuery } from "react-query";
import { IErrorResponse } from "../../api/companies/types";
import { IGetReviewRes } from "../../api/reviews/types";
const NoSSRViewer = dynamic(() => import("../../components/Viewer"), {
  ssr: false,
});

export default function DetailReview() {
  // const { singleList } = useSelector((state: RootState) => state.reviews);
  const router = useRouter();

  const {
    data: singleList,
    isLoading,
    refetch,
  } = useQuery<IGetReviewRes, IErrorResponse>(["review", router], () =>
    apis.reviewsApi.singleList({ id: router.query.id })
  );

  useEffect(() => {
    console.log(singleList);
  }, [isLoading]);

  const onDelete = () => {
    // dispatch(reviewActions.deleteReview({ id: singleList.id }));
  };

  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <div className="text-right mb-4">
        <Button variant="outlined">
          <Link href={`/review/`}>목록</Link>
        </Button>
        <Button variant="outlined" className="ml-2">
          <Link href={`/review/edit/${router.query.id}`}>수정</Link>
        </Button>
        <Button variant="outlined" className="ml-2" onClick={onDelete}>
          삭제
        </Button>
      </div>

      <div className="flex items-center mb-3">
        <div>
          <>
            {singleList?.categories?.[0]?.code === 1 ? (
              <div className="flex items-center text-[green]">
                병원
                <IconArrowRightSmall />
              </div>
            ) : singleList?.categories?.[0]?.code === 2 ? (
              <GrassIcon className="grass" />
            ) : singleList?.categories?.[0]?.code === 3 ? (
              <SmartToyIcon />
            ) : null}
          </>
        </div>
        <div>{singleList?.name}</div>
      </div>
      <h2 className="text-xl mb-1">
        {singleList?.title}
        <Rating
          name="simple-controlled"
          value={singleList?.rate ? singleList?.rate : 0}
        />
      </h2>
      <p className="flex items-centr text-xs text-[#979797]">
        <IconCalendarSmall />
        {singleList?.updated_at?.split("T")[0]}
      </p>
      <p className="flex items-centr text-xs text-[#979797]">
        <IconUserSmall />
        {singleList?.username}
      </p>

      <div className="border-t border-b mt-4 mb-4 pt-4 pb-4 min-h-[20rem]">
        {singleList?.content && <NoSSRViewer content={singleList?.content} />}
      </div>

      <Comment
        reviewId={router.query.id}
        commentLists={singleList?.comment_set}
      />
    </div>
  );
}

DetailReview.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
