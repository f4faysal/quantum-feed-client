"use client";

import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import { useSelector } from "react-redux";

interface UserProfileProps {
  params: {
    username: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const user = useSelector((state: any) => state.user.user);

  return (
    <div>
      <Header showBackArrow label={user?.name} />
      <UserHero username={user?.username} />
      <UserBio username={user?.username} />
      {/* <PostFeed username={user?.username} /> */}
    </div>
  );
};

export default UserProfile;
