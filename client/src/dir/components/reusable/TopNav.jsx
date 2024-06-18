import { Fragment } from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { FaUser } from "react-icons/fa";
import useAuth from "../../context/userAuth/useAuth";

export default function TopNav({ classColor }) {
  const [sidebar, setSidebar] = useState(false);

  const {username} = useAuth()
  const checkNav = () => {
    setSidebar(!sidebar);
  };

  return (
    <Fragment>
      {sidebar ? <SideBar loggedIn={true} close={checkNav} /> : null}
      <nav
        className={`relative ${classColor} flex items-center justify-between flex-wrap  p-2 pt-3 md:px-24`}
        style={{ position: "scroll", zIndex: 90 }}
      >
        <div className="pl-4 flex items-center pt-3 flex-shrink-0 text-white md:mr-24">
          <Link to="/">
            {/* large screen */}
            <span className=" flex-shrink items-center w-1/2 pb-2   ">
              <h1 className="text-2xl"> BF </h1>
            </span>
          </Link>
        </div>

        {/* HAMBURGER */}
        <div className="block lg:hidden">
          <button
            onClick={checkNav}
            // onClick={handleDropdown}
            className="flex items-center px-3 py-2 border rounded bg-white text-black border-white hover:text-blue-600 hover:bg-tranparent  "
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden  md:text-normal w-full   lg:flex   lg:items-center  justify-evenly lg:w-auto text-base ">
          <div className="font-bold lg:flex items-center justify-evenly md:space-x-20 md:mr-12">
            <Link to="/">
              <div className=" responsive-header block cursor-pointer   lg:inline-block lg:mt-0 text-white hover:text-white/75 ">
                Feeds
              </div>
            </Link>

            <Fragment>
              {username ? (
                <Link to="/user-profile">
                  <span className="rounded-full px-3 font-medium py-1 bg-white text-black responsive-header block cursor-pointer  lg:inline-block lg:mt-0 transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110">
                    <FaUser className="blue" />
                  </span>
                </Link>
              ) : (
                <Link to="/signin">
                  <span className="rounded-full px-3 font-medium py-1 bg-white text-black responsive-header block cursor-pointer  lg:inline-block lg:mt-0 transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110">
                    Login
                  </span>
                </Link>
              )}
            </Fragment>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
