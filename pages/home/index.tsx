import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReactElement, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import * as counterActions from "../../store/modules/counter";
import apis from "../../api";
import { AppDispatch } from "../../store";

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
    dispatch(counterActions.getAsync());
  }, []);

  return (
    <div>
      Home {counter.value}
      {/* <button onClick={() => plus()}>+</button> */}
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
