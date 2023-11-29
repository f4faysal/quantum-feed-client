"use client";

import { useNotificationsQuery } from "@/redux/api/notificationsAPI";
import { GiNestBirds } from "react-icons/gi";
import { ClipLoader } from "react-spinners";

const NotificationsFeed = () => {
  const { data, isLoading } = useNotificationsQuery({});

  if (data?.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={20} />
      </div>
    );
  return (
    <div className="flex flex-col">
      {data?.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border"
        >
          <GiNestBirds size={32} />
          <p className="">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
