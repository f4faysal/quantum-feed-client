"use client";

import Header from "@/components/Header";
import PostForm from "@/components/form/PostForm";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import { usePostQuery } from "@/redux/api/postAip";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
interface PostViewPageProps {
  params: {
    postId: string;
  };
}

const PostViewPage: React.FC<PostViewPageProps> = ({ params }) => {
  const router = useRouter();
  const { postId } = params;

  const { data, isLoading } = usePostQuery(postId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div>
      <Header showBackArrow label="Tuntuni" />
      <PostItem data={data} />
      <PostForm
        postId={postId as string}
        isComment
        placeholder="Tuntuni your reply"
      />
      <CommentFeed comments={data?.comments} />
    </div>
  );
};

export default PostViewPage;
