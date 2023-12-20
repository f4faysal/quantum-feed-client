import { formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import { AiFillHeart } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";

const NotificationsFeedItem = ({ notification }: any) => {
  const createdAt = useMemo(() => {
    if (!notification?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(notification.createdAt));
  }, [notification.createdAt]);

  return (
    <div
      key={notification.id}
      className="flex flex-row items-center p-6 gap-4 border-b-[1px] border"
    >
      {notification?.body === "Someone liked your Post!" ? (
        <AiFillHeart size={24} className="text-red-500" />
      ) : (
        <RiUserFollowFill size={24} className="text-sky-500" />
      )}
      <p className="">{notification.body}</p>
      <span className="text-neutral-500 text-sm">{createdAt}</span>
    </div>
  );
};

export default NotificationsFeedItem;
