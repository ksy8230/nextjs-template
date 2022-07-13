export type TUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  last_login: string;
  date_joined: string;
  groups: number[];
};

export interface UserState {
  user: TUser | null;
  me: any;
  isLoading: boolean;
  isRegistered: boolean;
  error: string;
}

export interface IUser {
  id?: number;
  username?: string;
  name?: string;
  email?: string;
}
