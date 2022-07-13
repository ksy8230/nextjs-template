import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { wrapper } from "../store";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { AppContextType } from "next/dist/shared/lib/utils";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

// 전역 상태 불러오기 (내 정보)
MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context: any) => {
    // AppContextType -> any
    const { ctx, Component } = context;
    let pageProps = {};

    const allCookies = ctx.req?.headers.cookie;
    const parts = allCookies?.split(`; `);
    let csrftoken = "" as string | undefined;
    let sessionid = "" as string | undefined;
    if (parts?.length === 2) {
      csrftoken = parts?.[0]?.split("csrftoken=")?.[1];
      sessionid = parts?.[1]?.split("sessionid=")?.[1];
    }
    if (sessionid) {
      const res = await axios.get("http://localhost:8000/account/whoIam/", {
        withCredentials: true,
        headers: {
          Cookie: allCookies as string,
        },
      });
      store.dispatch({
        type: HYDRATE,
        payload: { hydrate: res.data },
      });
    } else {
      store.dispatch({
        type: HYDRATE,
        payload: { hydrate: { username: "" } },
      });
    }

    // Component의 context로 ctx를 넣어주자
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // return한 값은 해당 페이지 컴포넌트의 props로 들어가게 됨.
    return { pageProps };
  }
);

export default wrapper.withRedux(MyApp);
