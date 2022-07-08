import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import * as counterActions from "../../store/modules/counter";
import apis from "../../api";
import { AppDispatch } from "../../store";
import {} from "./style";
import axios from "axios";

// const getAsync = createAsyncThunk(`counter/getAsync`, async () => {
//   //   const result = await apis.counterApi.getCount();
//   //   return result.data;
//   return {
//     payload: await apis.counterApi.getCount(),
//   };
// });

export default function Blog() {
  const dispatch = useDispatch<AppDispatch>();
  const counter = useSelector(({ counter }: any) => counter);

  // const plus = useCallback(() => {
  //   dispatch(counterActions.increment());
  // }, [dispatch]);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   dispatch(counterActions.getAsync());
  // }, []);

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onSubmit = () => {
    const form = {
      username: id,
      password,
      name: "kim",
      email,
    };
    console.log(form);
    postRegister(form);
  };

  const getArticles = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/article/");
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  const postRegister = async (data: any) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/account/register/",
        data,
        { withCredentials: true }
      );
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // getArticles();
  }, []);

  return (
    <div>
      <div className="input-form">
        <p>id</p>
        <input type="text" onChange={onChangeId} value={id} />
      </div>
      <div className="input-form">
        <p>password</p>
        <input type="password" onChange={onChangePassword} value={password} />
      </div>
      <div className="input-form">
        <p>email</p>
        <input type="text" onChange={onChangeEmail} value={email} />
      </div>
      <button onClick={onSubmit}>join</button>
    </div>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
