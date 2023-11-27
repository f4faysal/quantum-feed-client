import Header from "@/components/Header";
import PostForm from "@/components/form/PostForm";
import PostFeed from "@/components/posts/PostFeed";

const Home = () => {
  return (
    <div>
      <Header label="Home" />
      <PostForm placeholder="What's happening?" />
      <PostFeed />
    </div>
  );
};

export default Home;
