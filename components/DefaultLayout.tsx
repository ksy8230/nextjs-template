import { ReactNode } from "react";
import Footer from "./Footer";
import TopNavigation from "./TopNavigation";
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
      <div className="default-layout__top-navigation">
        <TopNavigation />
      </div>
      <div className="default-layout__container__content">{children}</div>
      <footer className="default-layout__footer">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
