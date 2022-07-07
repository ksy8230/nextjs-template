import axios from "axios";
import { ReactElement, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import PublicLayout from "../../components/PublicLayout";
import { AppDispatch } from "../../store";
import * as userActions from "../../store/modules/users";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      username: { value: string };
      password: { value: string };
    };
    const form = {
      username: target.username.value,
      password: target.password.value,
    };
    console.log(form);
    postLogin(form);
    // dispatch(userActions.login(form));
  };
  const postLogin = async (data: any) => {
    try {
      const res = await axios.post("/login/", data, {
        withCredentials: true,
      });
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" id="username" />
        <input type="password" id="password" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
