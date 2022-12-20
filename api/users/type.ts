import { JwtPayload } from "jwt-decode";

export const KEY_ME = "me";

export interface IJwtPayload extends JwtPayload {
  user_id?: number;
}

export interface IPostLogInRes {} // todo
export interface IPostLogInReq {
  username: string;
  password: string;
}

export interface IPostLogoutRes {} // todo
export interface IPostLogoutReq {}

export interface IPostRegisterRes {} // todo
export interface IPostRegisterReq {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface IPostUpdateRes {} // todo
export interface IPostUpdateReq {
  password: string;
  name: string;
  email: string;
}
