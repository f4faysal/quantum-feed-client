"use client";

import { formatDistanceToNowStrict } from "date-fns";

import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

// import useCurrentUser from "@/hooks/useCurrentUser";
// import useLike from "@/hooks/useLike";
// import useLoginModal from "@/hooks/useLoginModal";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  //   const loginModal = useLoginModal();
  const currentUser = useSelector((state: any) => state.user.user);

  //   const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/${data.user.username}`);
    },
    [router, data.user.username]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    //  if (!currentUser) {
    //    return loginModal.onOpen();
    //  }

    //  toggleLike();
  }, []);

  //   const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
  const LikeIcon = true ? AiFillHeart : AiOutlineHeart;

  console.log(data);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border
        p-5 
        cursor-pointer 
        hover:bg-white
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data?.user?.profileImage} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className=" mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            "
            >
              {/* <LikeIcon color={hasLiked ? "red" : ""} size={20} /> */}
              <LikeIcon color={true ? "red" : ""} size={20} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
