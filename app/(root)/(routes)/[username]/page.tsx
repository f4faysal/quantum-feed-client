"use client";

import Header from "@/components/Header";
import MyPostFeed from "@/components/posts/MyPostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import { useUserByUsernameQuery } from "@/redux/api/authApi";
import { ClipLoader } from "react-spinners";

interface UserProfileProps {
  params: {
    username: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const { data, isLoading } = useUserByUsernameQuery(params.username);

  if (isLoading)
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={20} />
    </div>
  );
  return (
    <div>
      <Header showBackArrow label={data?.name} />
      <UserHero username={data?.username} />
      <UserBio username={data?.username} />
      <MyPostFeed user={data} />
    </div>
  );
};

export default UserProfile;
