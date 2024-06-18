import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import SmallSideBar from "./SmallSideBar";
import { GiRank3 } from "react-icons/gi";
import { ImMenu } from "react-icons/im";
import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import useAuth from "../../context/userAuth/useAuth";
import { FiLogIn } from "react-icons/fi";

function BottomNav() {
  const [sidebar, setSidebar] = useState(false);

  const { username } = useAuth();

  const checkNav = () => {
    setSidebar(!sidebar);
  };
  return (
    <Fragment>
      {sidebar ? <SmallSideBar close={checkNav} /> : null}
      <div className=" pt-2 md:hidden fixed bottom-0 left-0 w-full h-auto  bg shadow-md shadow-black">
        <div className="z-90  flex items-center justify-between px-3 text-xs ">
          {username ? (
            <Fragment>
              <Link to="/user-profile">
                <div className="cursor-pointer flex-wrap items-center space-y-1 text-center transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110">
                  <div className="text-center flex justify-center">
                    <FaUserAlt size={24} className="text-white " />
                  </div>
                  <div className="flex items-center text-center text-white">
                    Profile
                  </div>
                </div>
              </Link>

              <Link to="/">
                <div className="cursor-pointer flex-wrap items-center space-y-1 text-center transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110">
                  <div className="text-center flex justify-center">
                    <GiRank3 size={24} className="text-white " />
                  </div>
                  <div className="flex items-center text-center text-white">
                    Feeds
                  </div>
                </div>
              </Link>

              <Link to="/following">
                <div className="cursor-pointer flex-wrap items-center space-y-1 text-center transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110">
                  <div className="text-center flex justify-center">
                    <FaUserFriends size={24} className="text-white " />
                  </div>
                  <div className="flex items-center text-center text-white">
                    Friends
                  </div>
                </div>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/signin">
                <div className="cursor-pointer flex-wrap items-center space-y-1 text-center transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110">
                  <div className="text-center flex justify-center">
                    <FiLogIn size={24} className="text-white " />
                  </div>
                  <div className="flex items-center text-center text-white">
                    Login
                  </div>
                </div>
              </Link>

              <Link to="/">
                <div className="cursor-pointer flex-wrap items-center space-y-1 text-center transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110">
                  <div className="text-center flex justify-center">
                    <GiRank3 size={24} className="text-white " />
                  </div>
                  <div className="flex items-center text-center text-white">
                    Feeds
                  </div>
                </div>
              </Link>
            </Fragment>
          )}

          <div
            onClick={checkNav}
            className="cursor-pointer flex-wrap items-center space-y-1 transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110"
          >
            <div className="text-center flex justify-center">
              <ImMenu size={26} className="text-white shadow-lg  " />
            </div>
            <div className="w-full text-white text-center">Menu</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BottomNav;
