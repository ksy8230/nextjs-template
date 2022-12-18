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

export const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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
