import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReactElement, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import * as counterActions from "../../store/modules/counter";
import apis from "../../api";
import { AppDispatch } from "../../store";
import {
  HomeH3,
  HomeHistory,
  HomeInformation,
  HomeProject,
  HomeSkill,
} from "./style";

// const getAsync = createAsyncThunk(`counter/getAsync`, async () => {
//   //   const result = await apis.counterApi.getCount();
//   //   return result.data;
//   return {
//     payload: await apis.counterApi.getCount(),
//   };
// });

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const counter = useSelector(({ counter }: any) => counter);

  // const plus = useCallback(() => {
  //   dispatch(counterActions.increment());
  // }, [dispatch]);

  useEffect(() => {
    // dispatch(counterActions.getAsync());
  }, []);

  return (
    <div>
      <HomeInformation>
        <p>@ksy8230</p>
        <h2>김수영</h2>
        <p>참크래커 개발자 🥮</p>
      </HomeInformation>
      <HomeHistory>
        <HomeH3>🧾 History</HomeH3>
        <div className="box">
          <div className="title">
            <p>Company.</p>
          </div>
          <div className="desc">
            <p>Front Developer</p>
            <p className="date">2020.04 ~ Present</p>
            <p className="tags">
              <span className="tag">React</span>
              <span className="tag">Typescript</span>
            </p>
          </div>
        </div>
        <div className="box">
          <div className="title">
            <p>Company.</p>
          </div>
          <div className="desc">
            <p>Web Publisher</p>
            <p className="date">2017.01 ~ 2020.12</p>
            <p className="tags">
              <span className="tag">Javascript</span>
              <span className="tag">html</span>
            </p>
          </div>
        </div>
      </HomeHistory>

      <HomeProject>
        <button type="button">Project 👉</button>
      </HomeProject>

      <HomeSkill>
        <HomeH3>✨ Skill</HomeH3>
        <ul>
          <li>
            <a href="">Reactjs</a>
          </li>
          <li>
            <a href="">Nextjs</a>
          </li>
          <li>
            <a href="">Typescript</a>
          </li>
          <li>
            <a href="">Docker</a>
          </li>
          <li>
            <a href="">Git</a>
          </li>
          <li>
            <a href="">Javascript</a>
          </li>
          <li>
            <a href="">Django</a>
          </li>
          <li>
            <a href="">Figma</a>
          </li>
        </ul>
      </HomeSkill>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
