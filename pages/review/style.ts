import styled from "styled-components";

export const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ReviewBox = styled.div`
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
  }
  .info {
    flex: 0.7;
    .rate {
    }
  }
`;
