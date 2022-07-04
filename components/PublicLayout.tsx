import { ReactNode } from "react";
/** 사용하는 페이지
 * 로그인
 */
type LayoutProps = {
  children?: ReactNode;
};

const PublicLayout = ({ children }: LayoutProps) => {
  return <div className="public-layout">{children}</div>;
};

export default PublicLayout;
