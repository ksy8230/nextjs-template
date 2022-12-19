import styled from "styled-components";

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 25rem;

  background-color: #fff;
  border-radius: 0.938rem;
  padding: 1rem;
  .custom-field {
    margin-bottom: 1rem;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  form {
    text-align: center;
  }
  input {
    // TODO -> 컴포넌트
    display: block;
    margin-bottom: 0.25rem;
    padding: 0.25rem;
    border-radius: 0.313rem;
    border: 2px solid #ddd;
    outline: 0;
    text-align: center;
    &:focus,
    &:active,
    &:focus-visible {
      border: 2px solid #2a68dd;
    }
  }
`;

export const SignUpContainer = styled.div`
  .custom-text-field {
    margin-bottom: 1rem;
  }
`;

export const SignUpSuccess = styled.div`
  p {
    text-align: center;
  }
`;
