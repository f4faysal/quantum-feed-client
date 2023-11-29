import {
  useUpdateUserMutation,
  useUserByUsernameQuery,
} from "@/redux/api/authApi";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Avatar from "../Avatar";

interface UserHeroProps {
  username: string;
}

const UserHero: React.FC<UserHeroProps> = ({ username }) => {
  const user = useSelector((state: any) => state.user.user);

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading } = useUserByUsernameQuery(username);

  useEffect(() => {
    setProfileImage(data?.profileImage);
    setCoverImage(data?.coverImage);
  }, [data?.profileImage, data?.coverImage]);

  const onUpload = useCallback(
    async (result: any) => {
      const url = result.info.secure_url;
      setProfileImage(url);
      const res = await updateUser({
        id: user?.id,
        data: { profileImage: url },
      }).unwrap();
      console.log(res);
    },
    [updateUser, setProfileImage, user?.id]
  );

  const onUploadCoverImage = useCallback(
    async (result: any) => {
      const url = result.info.secure_url;
      setCoverImage(url);
      const res = await updateUser({
        id: user?.id,
        data: { coverImage: url },
      }).unwrap();
    },
    [updateUser, setCoverImage, user?.id]
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={20} />
      </div>
    );
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        <span className="absolute top-1 right-3 text-white z-10 cursor-pointer ">
          <CldUploadWidget
            onUpload={onUploadCoverImage}
            uploadPreset="sf4vsqtt"
          >
            {({ open }) => {
              const onClick = () => {
                open();
              };

              return <div onClick={onClick}>edit</div>;
            }}
          </CldUploadWidget>
        </span>
        {data?.coverImage && (
          <Image
            src={coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}

        <CldUploadWidget onUpload={onUpload} uploadPreset="sf4vsqtt">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <div onClick={onClick} className="absolute -bottom-16 left-4">
                <Avatar userId={profileImage} isLarge hasBorder />
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default UserHero;
