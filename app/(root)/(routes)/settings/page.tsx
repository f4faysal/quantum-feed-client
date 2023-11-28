"use client";

import Header from "@/components/Header";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";

import MainModal from "@/components/modals/main-modal";
import { Button } from "@/components/ui/button";
import { onOpen } from "@/redux/features/modal/modalSlice";

import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <>
        <Header showBackArrow label="Settings" />
      </>
      <MainModal title="Change Password" description="It's quick and easy.">
        <ChangePasswordForm />
      </MainModal>
      <div className="p-2 border rounded-md m-4 hover:bg-white flex items-center cursor-pointer">
        <div>
          <h1
            onClick={() => dispatch(onOpen())}
            className="flex items-center gap-4"
          >
            <FaLock />
            <span className="">Change Password</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Settings;
