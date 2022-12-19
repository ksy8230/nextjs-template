import { ReactElement, SyntheticEvent, useRef } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../../../components/DefaultLayout";
import { RootState } from "../../../store";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { requestFetch } from "../../../api/types";
import { IReview } from "../../../store/modules/reviews/type";
import { Row } from "../../../styles/styled-component/style";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import apis from "../../../api";
import {
  IGetReviewRes,
  IPutReviewReq,
  IPutReviewRes,
  KEY_REVIEW,
  KEY_REVIEW_LIST,
} from "../../../api/reviews/types";
import { IErrorResponse } from "../../../api/companies/types";
import { IconArrowRightSmall } from "../../../components/Icon";
import { ROUTE_PATH } from "../../../constants";

const NoSSREditor = dynamic(() => import("../../../components/Editor/index"), {
  ssr: false,
});

export default function ReviewEdit() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.users);

  const editorRef = useRef<any>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const { data: singleList, isLoading } = useQuery<
    IGetReviewRes,
    IErrorResponse
  >([KEY_REVIEW, router], () =>
    apis.reviewsApi.singleList({ id: router.query.id })
  );
  const { mutate: editMutate } = useMutation<
    IPutReviewRes,
    IErrorResponse,
    IPutReviewReq
  >((form) => apis.reviewsApi.update(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY_REVIEW_LIST);
      router.push(ROUTE_PATH.review);
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & { rate: { value: number } };
    if (singleList) {
      const form = {
        categories: singleList?.categories && singleList?.categories,
        name: singleList?.name,
        region: singleList?.region,
        title: titleRef?.current?.value || "", //
        content: editorRef?.current?.getInstance().getHTML(), //
        rate: target.rate?.value, //
        username: me?.username,
      };
      editMutate({ data: form, id: singleList.id });
    }
  };

  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <div className="flex items-center mb-3">
        <div>
          <>
            {singleList?.categories?.[0]?.code === 1 ? (
              <div className="flex items-center text-[green]">
                병원
                <IconArrowRightSmall />
              </div>
            ) : singleList?.categories?.[0]?.code === 2 ? (
              <div className="flex items-center text-[green]">
                먹이
                <IconArrowRightSmall />
              </div>
            ) : singleList?.categories?.[0]?.code === 3 ? (
              <div className="flex items-center text-[green]">
                용품
                <IconArrowRightSmall />
              </div>
            ) : null}
          </>
        </div>
        <div>{singleList?.name}</div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* 제목 */}
        <Row>
          <TextField
            inputRef={titleRef}
            id="title"
            label="제목"
            variant="outlined"
            fullWidth
            className="custom-field"
            size="small"
            defaultValue={singleList?.title}
            required
          />
        </Row>
        {/* 편집기 */}
        <Row>
          <NoSSREditor
            content={singleList?.content ? singleList?.content : ""}
            editorRef={editorRef}
          />
        </Row>
        {/* 평점 */}
        <Row>
          <p className="font-base text-xs text-[gray]">업체 리뷰 점수</p>
          <Rating name="rate" defaultValue={singleList?.rate} />
        </Row>
        <Button variant="outlined" type="submit">
          수정
        </Button>
      </form>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const reviewList = await requestFetch<IReview[]>(
    `http://localhost:8000/review/list`
  );
  const paths = reviewList.map((post) => ({
    params: { id: `${post.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as any;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(KEY_REVIEW, () =>
    apis.reviewsApi.singleList({ id })
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

ReviewEdit.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
