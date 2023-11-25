import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuantumFeed | Home",
  description: "QuantumFeed is a social media platform for developers.",
};
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  // const { role, userId }: any = getUserInfo();
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!userId) {
  //     redirect("/sign-in");
  //   }
  //   setIsLoading(true);
  // }, [userId, role, isLoading]);

  // if (!isLoading) {
  //   return <Loading />;
  // }

  return <>{children}</>;
};

export default HomeLayout;
