"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import { useCreatePostMutation } from "@/redux/api/postAip";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Avatar from "../Avatar";
import Button from "../Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const PostForm: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const [image, setPostImage] = useState<string>("");
  const [createPost] = useCreatePostMutation();

  const currentUser = useSelector((state: any) => state.user.user);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onUpload = (result: any) => {
    const url = result.info.secure_url;
    setPostImage(url);
    // const res = await updateUser({
    //   id: user?.id,
    //   data: { profileImage: url },
    // }).unwrap();
    console.log(url);
  };

  const onSubmit = useCallback(async () => {
    try {
      const data = {
        body,
        image,
        userId: currentUser?.id,
      };
      setIsLoading(true);
      const res = await createPost(data);
      console.log("body", res);
      toast.success("Tuntuni Post created");
      setBody("");
      setPostImage("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, createPost, currentUser?.id, image]);

  return (
    <div className="border-b-[1px] border px-5 py-2">
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <Avatar userId={currentUser?.profileImage} />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(event) => setBody(event.target.value)}
            value={body}
            className="
                disabled:opacity-80
                peer
                mt-3 
                w-full 
                h-auto
                bg-transparent
                ring-0 
                outline-none 
                text-[16px] 
                placeholder-neutral-500 
              
              "
            placeholder={placeholder}
          ></textarea>
          <hr
            className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border 
                transition"
          />
          <div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="sf4vsqtt">
              {({ open }) => {
                const onClick = () => {
                  open();
                };

                return (
                  <div>
                    {image ? (
                      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden  mt-2">
                        <div className="z-10 absolute top-2 right-2   ">
                          <button
                            className="bg-white p-1 rounded-full"
                            type="button"
                            onClick={() => setPostImage("")}
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                        <Image
                          fill
                          className="object-cover"
                          alt="Image"
                          src={image}
                        />
                      </div>
                    ) : (
                      <ImagePlus
                        onClick={onClick}
                        className="h-6 w-6 mt-2 cursor-pointer"
                      />
                    )}
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="mt-4 flex flex-row justify-end">
            <Button
              disabled={isLoading || !body}
              onClick={onSubmit}
              label="Post"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
