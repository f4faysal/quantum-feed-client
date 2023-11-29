"use client";

import Header from "@/components/Header";
import CommentForm from "@/components/form/CommentForm";
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

  if (!data) {
    router.push("/");
  }
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={20} />
      </div>
    );

  return (
    <div>
      <Header showBackArrow label="Tuntuni" />
      <PostItem data={data} />
      <CommentForm
        postId={postId as string}
        isComment
        placeholder="Tuntuni your reply"
      />
      <CommentFeed comments={data?.comments} />
    </div>
  );
};

export default PostViewPage;
