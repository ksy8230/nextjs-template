import { ReactNode } from "react";
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
      <div className="default-layout__container">
        <div className="default-layout__top-navigation">top-navigation</div>
        <div className="default-layout__container__content">
          <div className="default-layout__left-navigation">left-navigation</div>
          {children}
        </div>
      </div>
      <footer className="default-layout__footer">footer</footer>
    </div>
  );
};

export default DefaultLayout;
