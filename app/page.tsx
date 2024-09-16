"use client";
import RootLayout from "@/app/layout";
import repository from "@/plugins/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Notification from "@/components/notification";

import INotification from "@/types/public/INotification";
import FetchFactory from "@/repositories/factory";
const fetch = new FetchFactory({ baseURL: "" });
const Page = () => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const result = await repository.company.GetAllCompanyTypes();
    setData(result);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const notifications: INotification = useSelector(
    (state: RootState): INotification => state.notification,
  );
  const getNotification = () => {
    fetch.notifySuccess("عالی");
    console.log("notifications: ", notifications);
  };
  useEffect(() => {
    console.log("notifications: ", notifications);
  }, [notifications]);
  return (
    <RootLayout>
      <div>
        {notifications.visibility && <Notification></Notification>}
        {data?.data.map((item: any) => (
          <div key={item.id}>
            {item.id} - {item.title}
          </div>
        ))}

        <button onClick={getNotification}>click me</button>
      </div>
    </RootLayout>
  );
};

export default Page;
