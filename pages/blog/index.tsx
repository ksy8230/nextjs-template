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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   dispatch(counterActions.getAsync());
  // }, []);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const onSubmit = () => {
    const form = {
      title: title,
      content: content,
    };
    console.log(form);
    postArticle(form);
  };

  const getArticles = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/article/");
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  const postArticle = async (data: any) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/article/", data);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <div className="input-form">
        <p>제목</p>
        <input type="text" onChange={onChangeTitle} value={title} />
      </div>
      <div className="input-form">
        <p>내용</p>
        <input type="text" onChange={onChangeContent} value={content} />
      </div>
      <button onClick={onSubmit}>글쓰기</button>
    </div>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
