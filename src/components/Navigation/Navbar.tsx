import { useState } from "react";
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import HamburgerMenu from "../UI/HamburgerMenu";
import Sidebar from "./Sidebar";
import { auth } from "../../firebase";

const Navbar = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  //   Toggle sideDrawer
  const toggleDrawer = () => {
    setShowSideDrawer((prev) => !prev);
  };

  const logOutHandler = () => {
    auth.signOut();
  };

  // active Navlink Style
  const activeClassName = "pb-[5px] border-b-[3px] border-b-black";

  // inactive Navlink Style
  const navStyle =
    " pb-2  border-b-2 border-transparent  link-underline link-underline-black ";
  return (
    <>
      <Sidebar
        open={showSideDrawer}
        toggle={toggleDrawer}
        show={showSideDrawer}
      />
      <nav className={`sticky top-0 bg-[#f2f2f2]  w-full  h-auto z-[20]`}>
        <div className="flex justify-between items-center px-6 py-3 duration-500  max-w-[1480px] mx-auto">
          <header>
            <Link className="flex justify-start items-center gap-x-2" to="/">
              <img src={logo} className="h-10" alt="spark-logo" />
              <h1 className="text-lg md:text-xl font-bold">SPARK</h1>
            </Link>
          </header>

          <button
            onClick={logOutHandler}
            className="hidden md:block text-white w-fit bg-[#003333] rounded-lg py-2 px-3 hover:bg-[#003333]/80 duration-500"
          >
            Sign Out
          </button>
          <HamburgerMenu toggle={toggleDrawer} open={showSideDrawer} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
