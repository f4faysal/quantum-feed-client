"use client";

import { usePostsQuery } from "@/redux/api/postAip";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = () => {
  const { data, isLoading } = usePostsQuery({});
  console.log(data);
  const posts = data || [];

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post?.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
