"use client";

import Header from "@/components/Header";
import { useSelector } from "react-redux";

interface UserProfileProps {
  params: {
    username: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const user = useSelector((state: any) => state.user.user);
  console.log(user);
  return (
    <div>
      <Header showBackArrow label={user?.name} />
      {params.username}
    </div>
  );
};

export default UserProfile;
