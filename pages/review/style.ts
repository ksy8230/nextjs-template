import styled from "styled-components";

export const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ReviewBox = styled.div`
  position: relative;
  p,
  legend {
    margin: 0 0 0.25rem;
    font-size: 14px;
    padding: 0;
    font-family: inherit;
  }
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin: 0.25rem;
  min-width: 32.4%;
  padding: 0.5rem;
  .thumb {
    flex: 0.3;
    text-align: center;
    font-size: 2.5rem;
  }
  .info {
    flex: 0.7;
    .rate {
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
