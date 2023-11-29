"use client";

import Sidebar from "@/components/layout/Sidebar";
import Container from "@/components/layout/container";
import { getUserInfo } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId, username } = getUserInfo() as {
    userId: string;
    username: string;
  };

  useEffect(() => {
    if (!userId) {
      redirect("/sign-in");
    }
    setIsLoading(true);
  }, [userId, isLoading]);

  if (!isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={20} />
      </div>
    );

  return (
    <div className="h-screen ">
      <Container>
        <div className="h-full ">
          <div className="grid grid-cols-12 h-full">
            <Sidebar />

            <div className=" col-span-10 lg:col-span-6 border-x-[1px] ">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeLayout;
