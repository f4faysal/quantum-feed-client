import Header from "@/components/Header";
import PostForm from "@/components/form/PostForm";

const Home = () => {
  return (
    <div>
      <Header label="Home" />
      <PostForm placeholder="What's happening?" />
    </div>
  );
};

export default Home;
