"use client";

import { usePostsByUserQuery } from "@/redux/api/postAip";
import { ClipLoader } from "react-spinners";
import PostItem from "./PostItem";

interface MyPostFeedProps {
  user?: Record<string, any>;
}

const MyPostFeed: React.FC<MyPostFeedProps> = ({ user }) => {
  const { data, isLoading } = usePostsByUserQuery(user?.id);

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

export default MyPostFeed;
