import { socialApiClient } from "../client";
import { storage } from "../constants";
import { IJwtPayload, TLoginData } from "./type";
import jwt, { JwtPayload } from "jwt-decode";
import { loginUtil } from "../../helper";
import { AxiosResponse } from "axios";

export const api = {
  login(data: TLoginData) {
    return socialApiClient.post("/account/login/", data);
  },

  async validToken() {
    const accessToken = sessionStorage.getItem(storage.accessToken) as string;
    const refreshToken = sessionStorage.getItem(storage.refreshToken) as string;
    console.log("accessToken", accessToken);

    const refreshThreshold = (new Date().getTime() + 3 * 60 * 1000) / 1000; // 현재 시간 ~ 3분전으로 세팅
    const expiredDate = jwt<JwtPayload>(accessToken && accessToken).exp; // access 토큰 만료 기간
    const expiredRefreshTokenDate = jwt<JwtPayload>(
      refreshToken && refreshToken
    ).exp; // refresh 토큰 만료 기간
    const userId = jwt<IJwtPayload>(accessToken && accessToken).user_id;

    console.log("a expired date", expiredDate); // access 토큰 만료일
    console.log("r expired date", expiredRefreshTokenDate); // refresh 토큰 만료일

    let resultToken;

    if (Math.floor(refreshThreshold) > expiredDate!) {
      // 현재시간과 ls에 저장되어있던 액세스 토큰 만료기간 비교
      console.log("액세스 토큰 만료시간 지남");
      if (+refreshThreshold > expiredRefreshTokenDate!) {
        // 리프레시 토큰까지 만료됐다면 로그인 화면으로 이동
        window.location.href = "/login";
        // 토큰을 랜덤 넘버들 섞어서 파기
        for (let i = 0; i < 3; i += 1) {
          sessionStorage.setItem(
            storage.accessToken,
            loginUtil.makeRandomNumber(208)
          );
          sessionStorage.setItem(
            storage.refreshToken,
            loginUtil.makeRandomNumber(208)
          );
        }
        sessionStorage.removeItem(storage.accessToken);
        sessionStorage.removeItem(storage.refreshToken);
      } else {
        // 액세스 토큰만 만료시 리프레시 토큰을 이용해 새로운 액세스 토큰 재발급
        const res = (await socialApiClient.post("/v1/token/refresh", {
          refresh: refreshToken,
        })) as AxiosResponse;
        const {
          data: { access: newToken },
        } = res;

        sessionStorage.setItem(storage.accessToken, newToken);
        sessionStorage.setItem(storage.refreshToken, refreshToken);
        resultToken = newToken;
      }
    } else {
      resultToken = accessToken;
    }

    return { resultToken, userId };
  },

  validCookie() {
    const allCookies =
      typeof document === "undefined" ? ({} as any) : `; ${document.cookie}`;
    const parts = allCookies.split(`; csrftoken=`);
    let csrftoken;
    if (parts.length === 2) {
      csrftoken = parts.pop().split(";").shift();
    }
    return { csrftoken };
  },

  register(data: any) {
    return socialApiClient.post("/account/register/", data);
  },

  whoIam() {
    return socialApiClient.get("/account/whoIam/");
  },

  logout() {
    return socialApiClient.post("/account/logout/", {});
  },

  updateUser(data: any) {
    return socialApiClient.patch("/account/updateUser/", data);
  },
};
