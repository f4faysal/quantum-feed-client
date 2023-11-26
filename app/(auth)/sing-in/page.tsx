import LoginFrom from "@/components/LoginFrom";

const SingIn = () => {
  return (
    <div className="h-full flex items-center justify-center gap-3">
      <div>
        <h1 className="text-[55px] font-bold text-blue-600">Tuntuni Feed</h1>
        <p className="text-xl text-gray-800 ">
          Tuntuni helps you connect and <br /> share with the people in your
          life.
        </p>
      </div>
      <div>
        <div>
          <LoginFrom />
        </div>
      </div>
    </div>
  );
};

export default SingIn;
