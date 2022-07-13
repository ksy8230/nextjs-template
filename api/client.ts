import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import dotenv from "dotenv";
import apis from "./index";

// dotenv.config();

let windowProtocol, windowHost, windowPort;
if (typeof window !== "undefined") {
  // localhost 일시 포트가 localhost: 뒤에 있는 번호
  windowProtocol = window?.location.protocol; // http:
  windowHost = window.location.host.split(":")[0]; // local.mist.com
  windowPort = window.location.port; // 80
}

const SOCIAL_SERVER_URL = `${
  process.env.NEXT_PUBLIC_PROTOCOL || windowProtocol
}//${process.env.NEXT_PUBLIC_API_HOST || windowHost}:${
  process.env.NEXT_PUBLIC_PORT || windowPort
}${process.env.NEXT_PUBLIC_PREFIX}`;

// console.log("SOCIAL_SERVER_URL =", SOCIAL_SERVER_URL);

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
