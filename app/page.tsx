"use client";
import RootLayout from "@/app/layout";
import repository from "@/plugins/api";
import { useEffect, useState } from "react";
import Notification from "@/components/notification";
import Loading from "@/components/loading";
const Page = () => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const result = await repository.company.Get(56);
    setData(result);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <RootLayout>
      <>
        <Loading>
          <Notification></Notification>
          <div className={"w-full flex justify-center"}>
            <div>
              <div>id: {data?.data.id}</div>
              <div>title: {data?.data.title}</div>
            </div>
            <button className={"py-1 px-3 border rounded"} onClick={fetchData}>
              fetch
            </button>
          </div>
        </Loading>
      </>
    </RootLayout>
  );
};

export default Page;
