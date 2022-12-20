import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import apis from "./index";

// 서버 주소 자주 바뀌는 경우 uri 바라보도록 설정
// let windowProtocol, windowHost, windowPort;
// if (typeof window !== "undefined") {
//   windowProtocol = window?.location.protocol; // http:
//   windowHost = window.location.host.split(":")[0]; // localhost
//   windowPort = window.location.port; // 80
// }

const SOCIAL_SERVER_URL = `${process.env.NEXT_PUBLIC_PROTOCOL}//${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_PORT}${process.env.NEXT_PUBLIC_PREFIX}`;
console.log("SOCIAL_SERVER_URL", SOCIAL_SERVER_URL);

function apiRequestProtocol() {
  if (process.env.NEXT_PUBLIC_TOKEN_AUTH === "1") {
    return axios.create({
      baseURL: SOCIAL_SERVER_URL,
    });
  }
  if (process.env.NEXT_PUBLIC_COOKIE_AUTH === "1") {
    return axios.create({
      baseURL: SOCIAL_SERVER_URL,
      withCredentials: true,
    });
  }
}

const socialApiClient = apiRequestProtocol() as AxiosInstance;

const NoAuthURL = [
  "/account/login/",
  "/account/register/",
  "/v1/config/password",
  "/v1/token",
  "/v1/token/refresh",
];

socialApiClient?.interceptors.request.use(async function (
  config: AxiosRequestConfig
) {
  if (NoAuthURL.indexOf(config.url!) !== -1) {
    return config;
  } else {
    // 토큰 인증 방식
    if (process.env.NEXT_PUBLIC_TOKEN_AUTH === "1") {
      console.log("TOKEN_AUTH");
      const { resultToken } = await apis.usersApi.validToken();
      console.log(resultToken);
      config.headers!.Authorization = resultToken
        ? `Bearer ${resultToken}`
        : "";

      if (config.url!.startsWith("/v1/files/")) {
        config.responseType = "blob";
      }
      return config;
    }
    // 쿠키 인증 방식
    if (process.env.NEXT_PUBLIC_COOKIE_AUTH === "1") {
      console.log("COOKIE_AUTH");
      const { csrftoken } = await apis.usersApi.validCookie();
      config.headers!["X-CSRFToken"] = csrftoken ? csrftoken : "";
      return config;
    }
  }
});

export { socialApiClient };
