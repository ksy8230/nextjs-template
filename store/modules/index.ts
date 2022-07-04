import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";

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
  users: IUser;
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
    // 여기에 추가
  })(state, action);
};

export default rootReducer;
