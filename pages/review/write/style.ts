import styled from "styled-components";

export const SearchTag = styled.span`
  display: inline-block;
  margin: 0 0.25rem;
  border: 1px solid #ddd;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.08);
  padding: 0.25rem 0.5rem;
  cursor: pointer;
`;

export const Row = styled.div`
  margin-bottom: 0.5rem;
`;

export const TextFieldContainer = styled.div``;

// comment
export const CommentContainer = styled.div`
  textarea {
    display: block;
    width: 100%;
    min-height: 50px;
    border: 0;
    border-radius: 15px;
    &:focus-visible {
      outline: none;
    }
  }
  .comment-area {
    display: flex;
    align-items: center;
    textarea {
      flex: 1;
      margin-left: 0.5rem;
      background-color: #f7f7d1;
      padding: 1rem;
    }
  }
  .button-area {
    margin: 0.5rem 0 0 0;
    text-align: right;
  }
`;
