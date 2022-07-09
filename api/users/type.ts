// import { JwtPayload } from "jwt-decode";

export type TLoginData = {
  username: string;
  password: string;
};

export type TRegisterData = {
  username: string;
  password: string;
  name: string;
  email: string;
};

// export interface IJwtPayload extends JwtPayload {
//   user_id?: number;
// }
