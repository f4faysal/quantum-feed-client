import LoginFrom from "@/components/LoginFrom";

const SingIn = () => {
  return (
    <div className="h-full flex items-center justify-center gap-3">
      <div>
        <h1 className="text-5xl font-bold">Tuntuni Feed</h1>
        <p>
          Tuntuni helps you connect <br /> and share with the people in your
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
