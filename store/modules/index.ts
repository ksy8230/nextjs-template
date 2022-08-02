import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import users from "./users/index";
import companies from "./componies/index";
import reviews from "./reviews/index";
import { ICompanyState } from "./componies/type";

// 미사용 확인 필요
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
  counter: ICounter;
  users: any;
  companies: ICompanyState;
  posts: IPost;
  reviews: any;
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
    companies,
    reviews,
    // 여기에 추가
  })(state, action);
};

export default rootReducer;
