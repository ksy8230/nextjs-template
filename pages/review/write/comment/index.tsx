import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { CommentContainer } from "../style";
import CommentIcon from "@mui/icons-material/Comment";

const Comment = () => {
  return (
    <CommentContainer>
      <h4>댓글</h4>
      <div className="comment-area">
        <CommentIcon />
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          style={{ width: 200 }}
        />
      </div>
      <div className="button-area">
        <Button variant="outlined">등록</Button>
      </div>
    </CommentContainer>
  );
};

export default Comment;
