import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook | Log in or sign up",
  description: "",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AuthLayout;
