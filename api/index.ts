import { api as counterApi } from "./counter";
import { api as usersApi } from "./users";
import { api as companiesApi } from "./companies";
import { api as reviewsApi } from "./reviews";

const apis = {
  counterApi, // 삭제하기(테스트용)
  usersApi,
  companiesApi,
  reviewsApi,
};

export default apis;
