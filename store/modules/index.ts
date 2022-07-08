import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import users from "./users/index";

export interface IUser {
  isLoggedIn: boolean;
  user: any;
  signUpdata?: any;
  loginData?: any;
}
export interface IPost {}
export interface ICounter {
  value: number;
  todo: {
    loading: boolean;
    data: {
      title: string;
      content: string;
    };
  };
}

export interface State {
  users: any;
  posts: IPost;
  counter: ICounter;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    counter,
    users,
    // 여기에 추가
  })(state, action);
};

export default rootReducer;
