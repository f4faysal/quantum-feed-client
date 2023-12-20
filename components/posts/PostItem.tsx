"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatDistanceToNowStrict } from "date-fns";

import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";

import {
  useDeletePostMutation,
  useLikePostMutation,
} from "@/redux/api/postAip";
import { Edit, Share, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();

  const user = useSelector((state: any) => state.user.user);

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/${data?.user?.username}`);
    },
    [router, data?.user?.username]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();
      await likePost(data?.id);
      toast.success("Liked");
    },
    [likePost, data?.id]
  );

  const handelDelete = async () => {
    const res: any = await deletePost(data?.id);
    if (res?.data) {
      toast.success("Deleted post successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const hasLiked = data?.likedIds.includes(user?.id);

  const LikeIcon = data?.likedIds.length ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
        border-b-[1px] 
        border
        p-5 
     
        hover:bg-white
        transition
        flex
        justify-between
      "
    >
      <div className="flex flex-col w-full  gap-3">
        <div className="flex justify-between items-center">
          <div onClick={goToUser}>
            <Avatar userId={data?.user?.profileImage} />
          </div>
          <div>
            {user?.id === data?.userId && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="text-xl">
                    <HiOutlineDotsVertical />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      toast.success("Shared post Coming soon");
                    }}
                  >
                    <Share className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handelDelete}>
                    <Trash className="mr-2 h-4 w-4 text-red-600" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      toast.success("Edited Coming soon");
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
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
          <div className="mt-1">
            <p className="text-base">{data?.body}</p>
            {data?.image && (
              <div
                onClick={goToPost}
                className="relative w-full h-[250px] md:w-full md:h-[400px] rounded-md overflow-hidden  mt-2"
              >
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={data?.image}
                />
              </div>
            )}
          </div>
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
              <AiOutlineMessage onClick={goToPost} size={20} />
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
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
