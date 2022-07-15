import React from "react";
import { FooterContainer } from "./style";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="title">🐰 건강 관리 용도로 만든 사이트</div>
      <a href="mailto:mollog8230@gmail.com">mollog8230@gmail.com</a>
      <address className="accounts">
        <p>
          <a href="">git</a>
        </p>
      </address>
    </FooterContainer>
  );
};

export default Footer;
