"use client";

import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userId, username } = getUserInfo() as {
    userId: string;
    username: string;
  };

  if (userId && username) {
    router.push("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
