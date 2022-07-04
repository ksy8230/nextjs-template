import { JwtPayload } from "jwt-decode";

export type TLoginData = {
  username: string;
  password: string;
};

export interface IJwtPayload extends JwtPayload {
  user_id?: number;
}
