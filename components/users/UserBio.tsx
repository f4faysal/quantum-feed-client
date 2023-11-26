"use clint";

import { BiCalendar } from "react-icons/bi";
import { useSelector } from "react-redux";
import Button from "../Button";

interface UserBioProps {
  username: string;
}

const UserBio: React.FC<UserBioProps> = ({ username }) => {
  const user = useSelector((state: any) => state.user.user);

  //   const { isFollowing, toggleFollow } = useFollow(userId);

  //   const createdAt = useMemo(() => {
  //     if (!fetchedUser?.createdAt) {
  //       return null;
  //     }

  //     return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  //   }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {user?.id ? (
          <Button
            secondary
            label="Edit"
            onClick={() => {
              console.log("hi");
            }}
          />
        ) : (
          <Button
            onClick={() => {
              console.log("hi");
            }}
            //   onClick={toggleFollow}
            label={false ? "Unfollow" : "Follow"}
            secondary={!false}
            outline={false}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="capitalize text-2xl font-semibold">{user?.name}</p>
          <p className="text-md text-neutral-500">@{user?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="">{user?.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followingIds?.length || 0}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
