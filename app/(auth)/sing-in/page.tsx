import LoginFrom from "@/components/LoginFrom";
import Container from "@/components/layout/container";

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
    </Container>
  );
};

export default SingIn;
