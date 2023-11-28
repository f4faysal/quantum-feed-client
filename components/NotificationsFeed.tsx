"use client";

import { useNotificationsQuery } from "@/redux/api/notificationsAPI";
import { GiNestBirds } from "react-icons/gi";

const NotificationsFeed = () => {
  // const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { data, isLoading } = useNotificationsQuery({});

  // useEffect(() => {
  //   mutateCurrentUser();
  // }, [mutateCurrentUser]);

  if (data?.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

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
