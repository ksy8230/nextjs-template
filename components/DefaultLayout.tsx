import { ReactNode, useEffect } from "react";
import Footer from "./Footer";
import TopNavigation from "./TopNavigation";
import { GetStaticPaths, GetStaticProps } from "next";
/** 사용하는 페이지
 * 홈
 * 분석결과
 */
type LayoutProps = {
  children?: ReactNode;
};

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="default-layout">
      <TopNavigation />
      <div className="max-w-[80rem] m-auto pt-[2rem] pb-[4rem] min-h-fit">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
