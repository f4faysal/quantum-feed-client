import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";

interface UserHeroProps {
  username: string;
}

const UserHero: React.FC<UserHeroProps> = ({ username }) => {
  const user = useSelector((state: any) => state.user.user);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user?.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={user?.profileImage} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
