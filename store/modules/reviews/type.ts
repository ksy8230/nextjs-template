import { TCompony } from "../componies/type";

export interface IReview extends TCompony {
  id: number;
  title: string; // 리뷰 제목
  content: string; // 리뷰 내용
  rate: number; // 리뷰 평점
  updated_at: string; // 리뷰 업데이트 날짜
}
