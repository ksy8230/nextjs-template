import styled from "styled-components";

export const HomeInformation = styled.section`
  padding: 4rem 0 3.5rem;
  p,
  h2 {
    margin: 0;
    margin-bottom: 0.25rem;
  }
  h2 {
    font-size: 2.125rem;
  }
  p {
    &:first-child {
      font-size: 0.85rem;
      color: #2a68dd;
      font-weight: 600;
    }
  }
`;

export const HomeH3 = styled.h3`
  padding-bottom: 2rem;
  color: #2a68dd;
  font-weight: 600;
  margin: 0;
`;

export const HomeHistory = styled.section`
  padding-bottom: 2rem;
  .box {
    display: flex;
    align-items: flex-start;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    border-top: 1px solid #ddd;
  }
  p {
    margin: 0;
  }
  .title {
    width: 50%;
  }
  .desc {
    > p {
      margin-bottom: 0.25rem;
      &.date {
        font-size: 0.8125rem;
      }
      &.tags {
        padding-top: 1rem;
      }
    }
  }
  .tag {
    display: inline-block;
    margin-right: 0.25rem;
    padding: 0.25rem 0.45rem;
    background-color: #2a68dd;
    color: #fff;
    border-radius: 1rem;
    font-size: 0.85rem;
    line-height: 0.85rem;
  }
`;

export const HomeProject = styled.section`
  text-align: right;
  padding-bottom: 2rem;
  button {
    display: inline-block;
    padding: 0.45rem 0.6rem;
    background-color: #2a68dd;
    color: #fff;
    border-radius: 0.25rem;
    font-size: 0.85rem;
    line-height: 0.85rem;
    border: 0;
    cursor: pointer;
  }
`;

export const HomeSkill = styled.section`
  padding-bottom: 2rem;
  ul {
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      margin-right: 0.65rem;
      padding: 0.25rem 0.45rem;
      border: 1px solid #2a68dd;
      color: #2a68dd;
      border-radius: 1rem;
      font-size: 0.85rem;
      line-height: 0.85rem;
    }
  }
`;
