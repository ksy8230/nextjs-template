import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/DefaultLayout";

export default function DetailReview() {
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    if (router.query) {
      console.log(router.query);
    }
  }, []);

  return <div>DetailReview</div>;
}

DetailReview.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
