"use client";

import { usePostsQuery } from "@/redux/api/postAip";
import { ClipLoader } from "react-spinners";
import PostItem from "./PostItem";

interface PostFeedProps {
  username?: string;
}

const PostFeed: React.FC<PostFeedProps> = () => {
  const { data, isLoading } = usePostsQuery({});

  const posts = data || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={20} />
      </div>
    );

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post?.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
