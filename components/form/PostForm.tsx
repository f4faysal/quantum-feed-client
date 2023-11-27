"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import { useCreatePostMutation } from "@/redux/api/postAip";
import Avatar from "../Avatar";
import Button from "../Button";

// import useLoginModal from "@/hooks/useLoginModal";
// import useRegisterModal from "@/hooks/useRegisterModal";
// import useCurrentUser from "@/hooks/useCurrentUser";
// import usePosts from "@/hooks/usePosts";
// import usePost from "@/hooks/usePost";

// import Avatar from "./Avatar";
// import Button from "./Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const PostForm: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  // const registerModal = useRegisterModal();
  // const loginModal = useLoginModal();

  const [createPost] = useCreatePostMutation();

  const currentUser = useSelector((state: any) => state.user.user);

  // const { mutate: mutatePosts } = usePosts();
  // const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      const data = {
        body,
        userId: currentUser?.id,
      };
      setIsLoading(true);
      const res = await createPost(data);
      console.log("body", res);
      toast.success("Tuntuni Post created");
      setBody("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, createPost, currentUser?.id]);

  return (
    <div className="border-b-[1px] border px-5 py-2">
      <div className="flex flex-row gap-4">
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
                resize-none 
                mt-3 
                w-full 
              bg-transparent
                ring-0 
                outline-none 
                text-[20px] 
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
