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
