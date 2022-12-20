import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { wrapper } from "../store";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { AppContextType } from "next/dist/shared/lib/utils";
import { ReactQueryDevtools } from "react-query/devtools";
import apis from "../api";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// react-query provider 주입
// 각 페이지마다 request 별로 새로운 QueryClient instance를 생성 가능
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  // return getLayout(
  //   <QueryClientProvider client={queryClient}>
  //     <Hydrate state={pageProps?.dehydrateState}>
  //       <Component {...pageProps} />
  //     </Hydrate>
  //     <ReactQueryDevtools />
  //   </QueryClientProvider>
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydrateState}>
        {getLayout(<Component {...pageProps} />)}
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

// 내 정보 전역 상태에 주입하기
MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context: any) => {
    const { ctx, Component } = context;
    let pageProps = {};

    const allCookies = ctx.req?.headers.cookie;
    // ctx.req?.cookies && ctx.req?.cookies["sessionid"]

    if (allCookies) {
      console.log("ssr allCookies==========", allCookies);
      console.log("process.env.BACKEND_URL==========", process.env.BACKEND_URL);
      console.log(
        "process.env.NEXT_PUBLIC_BACKEND_URL==========",
        process.env.NEXT_PUBLIC_BACKEND_URL
      );
      let url = `${
        process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      }/account/whoIam/`;

      const res = await axios.get(url as string, {
        headers: {
          Cookie: allCookies as string,
        },
      });
      if (res.data) {
        store.dispatch({
          type: HYDRATE,
          payload: { users: { me: res.data } },
        });
      }
      console.log("store", store.getState());
    }

    // Component의 context로 ctx를 넣어주자
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // return한 값은 해당 페이지 컴포넌트의 props로 들어가게 됨.
    // return { pageProps };
  }
);

export default wrapper.withRedux(MyApp);
