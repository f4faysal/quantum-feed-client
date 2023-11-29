"use client";

import { useMyProfileQuery } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter();
  const { userId, username } = getUserInfo() as {
    userId: string;
    username: string;
  };
  const dispatch = useAppDispatch();
  const { data, isLoading } = useMyProfileQuery(userId);

  useEffect(() => {
    dispatch(setUser(data));
  }, [data, dispatch]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={22}
            className="
              cursor-pointer 
              text-sky-500
              hover:opacity-70 
              transition
          "
          />
        )}
        <h1 className="text-base font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
