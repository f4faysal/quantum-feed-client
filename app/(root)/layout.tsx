import Sidebar from "@/components/ui/layout/Sidebar";
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

  return (
    <div className="h-screen">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div
            className="
          col-span-3 
          lg:col-span-2 
          border-x-[1px] 
          border-neutral-800
      "
          >
            {children}
          </div>
          {/* <FollowBar /> */}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
