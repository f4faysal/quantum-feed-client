"use client";

import { useNotificationsQuery } from "@/redux/api/notificationsAPI";
import { ClipLoader } from "react-spinners";
import NotificationsFeedItem from "./NotificationsFeedItem";

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
      {data?.slice(0, 20).map((notification: Record<string, any>) => (
        <NotificationsFeedItem
          key={notification?.id}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default NotificationsFeed;
