"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { authKey } from "@/constants/storageKey";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { removeUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { GiNestBirds } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const user = useSelector((state: any) => state.user.user);
  const [updateUser] = useUpdateUserMutation();

  const x = async () => {
    const res = await updateUser({
      id: user?.id,
      data: {
        hasNotification: false,
      },
    });
  };

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: FaUserFriends,
      label: "Friends",
      href: "/friends",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: user?.hasNotification,
      onclick: x,
    },
    {
      icon: FaVideo,
      label: "Video",
      href: `/video`,
    },
    {
      icon: IoMdSettings,
      label: "Settings",
      href: `/settings`,
    },
  ];

  return (
    <div className="relative col-span-2 lg:col-span-4 h-full  md:pr-6">
      <div className="sticky top-0  flex flex-col items-end">
        <div className="space-y-2 ">
          <div className=" flex md:gap-1 items-center py-2 justify-center">
            <GiNestBirds size={28} className=" text-sky-500" />
            <h1 className="hidden md:block text-xl font-bold">Tuntuni</h1>
          </div>
          <Link href={`/${user?.username}`}>
            <div className="flex flex-row items-center">
              <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-blue-600 hover:bg-opacity-10 cursor-pointer lg:hidden">
                <Avatar>
                  <AvatarImage src={user?.profileImage || `/avator.png`} />
                </Avatar>
              </div>
              <div className="w-full relative hidden lg:flex  items-row gap-4 p-4 rounded-full hover:bg-blue-500 hover:bg-opacity-10 cursor-pointer items-center">
                <Avatar>
                  <AvatarImage src={user?.profileImage || `/avator.png`} />
                </Avatar>

                <p className="hidden lg:block text-black text-xl capitalize">
                  {user?.name}
                </p>
              </div>
            </div>
          </Link>
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              href={item.href}
              icon={item.icon}
              label={item.label}
              onClick={item.onclick}
            />
          ))}
          <SidebarItem
            onClick={() => {
              removeUserInfo(authKey);
              window.location.reload();
            }}
            icon={IoLogOut}
            label="Logout"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
