import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import Modal from "../UI/Modal";
import { auth } from "../../firebase";

type Props = {
  open: boolean;
  toggle: () => void;
  show: boolean;
};

const Sidebar = (props: Props) => {
  return (
    <Modal onClose={props.toggle} show={props.show}>
      <aside
        className={`z-[21] fixed top-0 left-0 w-3/4 md:w-2/4 h-screen -translate-x-full bg-black flex flex-col overflow-hidden ${
          props.open
            ? `translate-x-0 transform transition duration-300 ease-in-out`
            : `-translate-x-full transform transition duration-300 ease-in-out`
        }`}
      >
        <div className="grid grid-rows-[1fr_auto] h-full py-5">
          <div>
            <header
              className={!props.open ? "hidden" : "block text-white ml-7"}
            >
              <Link className="flex justify-start items-center gap-x-2" to="/">
                <img src={logo} className="h-10" alt="spark-logo" />
                <h1 className="text-lg md:text-xl font-bold">SPARK</h1>
              </Link>
            </header>
            <ul className=" lg:hidden items-start justify-between mt-6 pl-7 text-white"></ul>
          </div>
          <button
            onClick={() => auth.signOut()}
            className="text-white w-full bg-black rounded-3xl py-3 hover:bg-black/80 duration-500"
            type={`button`}
          >
            Sign Out
          </button>
        </div>
      </aside>
    </Modal>
  );
};

export default Sidebar;
