import logo from "../../assets/Logo.svg";

const LoadingScreen = () => {
  return (
    <div className="grid h-screen items-center justify-center place-content-center">
      <img
        src={logo}
        className="h-10 md:h-20 animate-bounce"
        alt="spark-logo"
      />
    </div>
  );
};

export default LoadingScreen;
