import React, { SyntheticEvent, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import * as reviewActions from "../../../store/modules/reviews/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconComment } from "../../../components/Icon";

type TCommnet = {
  reviewId: string | string[] | undefined;
  commentLists: any[];
};

const Comment = ({ reviewId, commentLists }: TCommnet) => {
  const dispatch = useDispatch<AppDispatch>();
  const [comment, setComment] = useState("");
  const [editActive, setEditActive] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState("");
  const [editComment, setEditComment] = useState("");

  // 댓글 생성
  const onChangeComment = (e: SyntheticEvent) => {
    setComment((e.target as HTMLTextAreaElement).value);
  };
  const onSubmit = () => {
    dispatch(
      reviewActions.registerComment({
        id: reviewId,
        data: { comment: comment },
      })
    );
  };
  // 댓글 수정
  const onChangeEditComment = (e: SyntheticEvent) => {
    setEditComment((e.target as HTMLTextAreaElement).value);
  };
  const onSubmitEdit = (commentId: string) => {
    dispatch(
      reviewActions.updateComment({
        commentId: commentId,
        data: { comment: editComment },
      })
    );
  };
  const editToggle = (commentId: string) => {
    setEditActive(!editActive);
    setCurrentCommentId(commentId);
  };
  // 댓글 삭제
  const onDelete = (commentId: string) => {
    dispatch(
      reviewActions.deleteComment({
        commentId: commentId,
      })
    );
  };
  return (
    <div>
      <p>댓글</p>
      <ul className="comment-list-area">
        {commentLists?.map((comment) => (
          <li key={comment.id}>
            <div className="comment-list-area__inn">
              <div className="writer_info">
                <div className="writer">
                  <AccountCircleIcon />
                  <p>{comment.username || "노네임"}</p>
                </div>
                <div className="actions">
                  <p className="date">{comment.created_at}</p>
                  <Button size="small" onClick={() => editToggle(comment.id)}>
                    <EditIcon />
                  </Button>
                  <Button size="small" onClick={() => onDelete(comment.id)}>
                    <DeleteForeverIcon />
                  </Button>
                </div>
              </div>
              {editActive && currentCommentId == comment.id ? (
                <>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    value={editComment}
                    onChange={onChangeEditComment}
                    className="editComment-area"
                    defaultValue={comment.comment}
                  />
                  <div className="button-area">
                    <Button
                      variant="outlined"
                      onClick={() => onSubmitEdit(comment.id)}
                    >
                      수정
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text">{comment.comment}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <IconComment />
        <TextareaAutosize
          className="w-full border-2 rounded-md text-sm p-2 outline-0 font-normal ml-3"
          aria-label="empty textarea"
          placeholder="댓글을 달아주세요"
          value={comment}
          onChange={onChangeComment}
        />
      </div>
      <Button variant="outlined" onClick={onSubmit} className="mt-3">
        등록
      </Button>
    </div>
  );
};

export default Comment;
