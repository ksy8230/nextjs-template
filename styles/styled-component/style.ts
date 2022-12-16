import styled from "styled-components";

export const Tag = styled.span<{ code: string | number }>`
  display: inline-block;
  border-radius: 5px;
  min-width: 50px;
  text-align: center;
  margin: 0 0.25rem;
  background-color: #1976d2;
  background-color: ${(props) =>
    props.code == "1" ? "#F44336" : props.code == "2" ? "#009688" : "#1976d2"};
  color: #fff;
  padding: 0.15rem 0;
`;

export const SignUpContainer = styled.div`
  .custom-text-field {
    margin-bottom: 1rem;
  }
`;

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

  .comment-list-area {
    list-style: none;
    padding: 0;
    margin: 0 0 3rem 0;
    font-size: 14px;
    p {
      margin: 0;
      &.date {
        font-size: 0.7rem;
        margin-right: 1rem;
      }
    }
    .comment-list-area__inn {
    }
    .writer_info {
      display: flex;
      justify-content: space-between;
      margin: 0 0 0.5rem 0;

      .writer {
        display: flex;
        align-items: center;
      }
      .actions {
        display: flex;
        align-items: center;
        button {
          min-width: 30px;
          font-size: 0.5rem;
        }
      }
    }
    .editComment-area {
      background-color: #e3ecf5;
      padding: 1rem;
      .button-area {
        text-align: right;
      }
    }
    li {
      margin-bottom: 1rem;
    }
  }
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ReviewHeader = styled.div`
  text-align: right;
`;

export const ReviewBox = styled.div`
  position: relative;
  p,
  legend {
    margin: 0 0 0.5rem;
    font-size: 14px;
    padding: 0;
    font-family: inherit;
  }

  border: 1px solid #ddd;
  border-radius: 15px;
  margin: 0.25rem;
  min-width: 32.4%;
  padding: 0.5rem;
  .content {
    display: flex;
    align-items: center;
    .thumb {
      flex: 0.3;
      text-align: center;
      font-size: 2.5rem;
      svg.hospital {
        color: #f44336;
      }
      svg.grass {
        color: #009688;
      }
    }
    .info {
      flex: 0.7;
      .name {
        font-size: 16px;
      }
      .rate {
        margin: 0.7rem 0 0 0;
      }
    }
  }
  .user {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    p {
      margin: 0;
      font-size: 12px;
      color: #252525;
    }
    svg {
      font-size: 20px;
      color: #252525;
    }
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-indent: -9999px;
  }
`;

export const ReviewDetailInfo = styled.div`
  .info {
    display: flex;
    align-items: center;
    > div + p {
    }
    .thumb {
      margin-right: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 50px;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 51px;
      svg.hospital {
        color: #f44336;
      }
      svg.grass {
        color: #009688;
      }
    }
  }
  .date {
    span {
      margin: 0.25rem;
      font-size: 14px;
    }
  }
  .rate {
    margin-top: 0.25rem;
  }
`;
