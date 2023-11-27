"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { GiNestBirds } from "react-icons/gi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const user = useSelector((state: any) => state.user.user);

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: FaUserFriends,
      label: "Friends",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: true,
    },
    {
      icon: MdOutlineOndemandVideo,
      label: "Video",
      href: `/`,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <div className=" flex gap-1 items-center py-2">
            <GiNestBirds className="text-4xl text-sky-500" />
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
            />
          ))}
          <SidebarItem
            onClick={() => {
              removeUserInfo(authKey);
              window.location.reload();
            }}
            icon={BiLogOut}
            label="Logout"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
