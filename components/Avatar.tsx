"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface AvatarProps {
  userId: any;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  //   const onClick = useCallback(
  //     (event: any) => {
  //       event.stopPropagation();

  //       const url = `/users/${userId}`;

  //       router.push(url);
  //     },
  //     [router, userId]
  //   );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-sky-500" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        //    onClick={onClick}
        src={userId?.profileImage || "/avator.png"}
      />
    </div>
  );
};

export default Avatar;
