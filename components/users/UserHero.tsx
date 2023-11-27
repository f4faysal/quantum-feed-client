import { useUserByUsernameQuery } from "@/redux/api/authApi";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";

interface UserHeroProps {
  username: string;
}

const UserHero: React.FC<UserHeroProps> = ({ username }) => {
  const user = useSelector((state: any) => state.user.user);
  const { data, isLoading } = useUserByUsernameQuery(username);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {data?.coverImage && (
          <Image
            src={data?.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={data?.profileImage} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
