import { useUpdateUserMutation } from "@/redux/api/authApi";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Button from "../Button";
import Input from "../Input";

const EditProfileForm = () => {
  const currentUser = useSelector((state: any) => state.user.user);

  const [updateUser] = useUpdateUserMutation();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    const updateData = {
      profileImage,
      coverImage,
      name,
      username,
      bio,
    };
    try {
      setIsLoading(true);
      const res: any = await updateUser({
        data: updateData,
        id: currentUser?.id,
      });

      if (res?.data) {
        toast.success("Updated");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    profileImage,
    coverImage,
    name,
    username,
    bio,
    updateUser,
    currentUser?.id,
  ]);

  return (
    <div>
      {" "}
      <div className="flex flex-col gap-4">
        {/* <ImageUpload
          value={profileImage}
          disabled={isLoading}
          onChange={(image) => setProfileImage(image)}
          label="Upload profile image"
        />
        <ImageUpload
          value={coverImage}
          disabled={isLoading}
          onChange={(image) => setCoverImage(image)}
          label="Upload cover image"
        /> */}
        <Input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          disabled={isLoading}
        />
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          disabled={isLoading}
        />
        <Input
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button label="Save" onClick={onSubmit} disabled={isLoading} />
      </div>
    </div>
  );
};

export default EditProfileForm;
