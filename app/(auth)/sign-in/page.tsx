import LoginFrom from "@/components/form/LoginFrom";
import SingUpFrom from "@/components/form/SingUpFrom";
import Container from "@/components/layout/container";
import MainModal from "@/components/modals/main-modal";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuntuni | Log in or sign up",
  description: "",
};

const SingIn = () => {
  return (
    <Container>
      <div className="h-screen">
        <div className="h-full flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-7 md:gap-9">
          <div>
            <h1 className="text-[55px] font-bold text-blue-600">
              Tuntuni Feed
            </h1>
            <p className="text-xl text-gray-800 text-center md:text-left">
              Tuntuni helps you connect and <br /> share with the people in your
              life.
            </p>
          </div>
          <div>
            <div>
              <LoginFrom />
            </div>
            <p className="text-center mt-6">
              <strong className="hover:underline">
                <a href="#">Create a Page</a>
              </strong>{" "}
              for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      <MainModal title="Sign Up" description="It's quick and easy.">
        <SingUpFrom />
      </MainModal>
    </Container>
  );
};

export default SingIn;
