"use clint";
import FollowCount from "@/lib/followCount";
import {
  useFollowUserMutation,
  useUserByUsernameQuery,
} from "@/redux/api/authApi";
import { onOpen } from "@/redux/features/modal/modalSlice";
import { format } from "date-fns";
import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import EditProfileForm from "../form/EditProfileForm";
import MainModal from "../modals/main-modal";

interface UserBioProps {
  username: string;
}

const UserBio: React.FC<UserBioProps> = ({ username }) => {
  const user = useSelector((state: any) => state.user.user);

  const { data, isLoading } = useUserByUsernameQuery(username);

  const [followUser] = useFollowUserMutation();

  const dispatch = useDispatch();

  //   const { isFollowing, toggleFollow } = useFollow(userId);

  const toggleFollow = async () => {
    const res = await followUser(data?.id);
  };

  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }

    return format(new Date(user.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="border-b-[1px] border- pb-4">
      <MainModal title="Edit your profile" description="It's quick and easy.">
        <EditProfileForm />
      </MainModal>
      <div className="flex justify-end p-2">
        {user?.id === data?.id ? (
          <Button secondary label="Edit" onClick={() => dispatch(onOpen())} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={false ? "UnFollow" : "Follow"}
            secondary={!false}
            outline={false}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="capitalize text-2xl font-semibold">{data?.name}</p>
          <p className="text-md text-neutral-500">@{data?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="">{data?.bio}</p>
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
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="">{data?.followingIds?.length || 0}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <FollowCount username={username} />
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
