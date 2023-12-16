import { useContext } from "react";
import { AuthContext } from "../util/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full h-full rounded-lg p-6 md:p-8 bg-[#e8f2d7] max-w-[600px] mx-auto">
      <p className="text-[0.9em]">
        Welcome back{" "}
        {user?.displayName
          ? user.displayName.split(" ")[0]
          : user?.email?.split("@")[0]}
      </p>
      <h2 className="font-bold mb-4 text-center my-6">
        What will you like to do today?{" "}
      </h2>
      <div className="flex flex-col justify-center max-w-[400px] mx-auto gap-4 ">
        <Link
          className="text-white w-full text-center bg-[#003333] rounded-lg py-2 px-4 hover:bg-[#003333]/80 duration-500 disabled:cursor-not-allowed"
          to="/spark/entry"
        >
          Log Gratitude
        </Link>
        <Link
          className="text-white w-full text-center bg-[#003333] rounded-lg py-2 px-4 hover:bg-[#003333]/80 duration-500 disabled:cursor-not-allowed"
          to="/spark/gratitude"
        >
          View God's Faithfulness
        </Link>
        <Link
          className="text-white w-full text-center bg-[#003333] rounded-lg py-2 px-4 hover:bg-[#003333]/80 duration-500 disabled:cursor-not-allowed"
          to="/spark/blessing"
        >
          Random Blessing{" "}
        </Link>
        <Link
          className="text-white w-full text-center bg-[#003333] rounded-lg py-2 px-4 hover:bg-[#003333]/80 duration-500 disabled:cursor-not-allowed"
          to="/spark/hope"
        >
          Promise of Hope
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
