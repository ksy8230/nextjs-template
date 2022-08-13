import styled from "styled-components";

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
