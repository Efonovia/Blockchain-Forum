import React, { useEffect, useReducer, useState } from "react";
import SocialsSettings from "../../components/user/SocialsSettings";
import Settings from "../../components/user/Settings";
import Follows from "../../components/user/Follows";
import Info from "../../components/user/Info";
import Footer from "../../components/reusable/Footer";
import {
  FaUser,
  FaUserEdit,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { ImUsers } from "react-icons/im";
import {
  userProfileReducer,
  INITIAL_STATE,
} from "../../context/profileReducer/userProfileReducer";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../../components/reusable/TopNav";
import useAuth from "../../context/userAuth/useAuth";
import { UpdateInfo } from "../../components/reusable/UpdateInfo";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import BottomNav from "../../components/reusable/BottomNav";
import { useQuery } from "react-query";
import Loader from "../../components/reusable/Loader";
import SkeletonLoader from "../../components/reusable/SkeletonLoader";
import { Fragment } from "react";

const UserProfile = ({ isVerified }) => {
  axios.defaults.withCredentials = true;
  const [state, dispatch] = useReducer(userProfileReducer, INITIAL_STATE);
  const {
    username,
    fullname,
    verified,
    following,
    follower, 
    profilePicture,
  } = useAuth();
  const navigate = useNavigate();

  const { isLoading, data, isError } = useQuery("userData", async () => {
    const dataAPI = `${import.meta.env.VITE_REACT_APP_USER}/me`;
    const response = await axios.get(dataAPI);
    return response.data;
  });
  const profile = () => {
    dispatch({ type: "PROFILE", payload: state.profile });
  };
  const follows = () => {
    dispatch({ type: "FOLLOWS", payload: state.follows });
  };

  const socialsSettings = () => {
    dispatch({ type: "SOCIALS", payload: state.socials });
  };

  const setting = () => {
    dispatch({ type: "SETTINGS", payload: state.settings });
  };
  const [allowUpdate, showAllowedUpdate] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const loveCookie = Cookies.get("profile") || null;
      if (loveCookie === "suspend") {
        showAllowedUpdate(false);
      } else {
        Cookies.set("profile", "empty", { expires: 1 });
        showAllowedUpdate(true);
      }
    }, 5000);
  }, [username, fullname]);

  const clearStorage = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_USER}/logout`)
      .then((data) => {
        localStorage.clear();
        Cookies.remove("user");
        Cookies.remove("SuperAdmin");
        Cookies.remove("administrator");
        navigate("/login");
      })
      .catch((err) => {
        alert("Error updating data");
      });
  };
 
  if (isError) {
    navigate("/social-corner?=not-logged-in");
  }

  return (
    <div>
      <TopNav classColor="bg py-2" />
      {fullname === null || fullname?.length < 4 ? (
        allowUpdate ? (
          <UpdateInfo />
        ) : null
      ) : null}
      {/* {profilePicture === null || profilePicture.length < 4 ? (
        allowUpdate ? (
          <UpdateInfo />
        ) : null
      ) : null} */}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <Fragment>
          <section className="shadow-inner">
            <div className="rounded-lg m mt-16 mx-8 md:mx-24 pt-3 bg-gray-100">
              <div className="w-full flex h-full items-center bg-white px-4 py-6 md:px-20 rounded-b-lg shadow-xl  ">
                <div className=" pr-4">
                  {profilePicture && profilePicture.length > 2 ? (
                    <img
                      src={`${
                        import.meta.env.VITE_REACT_APP_MAIN_HOST
                      }/${profilePicture}`}
                      alt="avatar"
                      className="text-xs inline border-double border-4 border-gray-400 transform sm:transform-gpu md:transform-none  rounded-full h-16 w-16 md:h-32 md:w-32 "
                    />
                  ) : (
                    <FaUserCircle className="h-12 w-12 text-[#090abb]/20" />
                  )}
                </div>
                <div className="w-3/5 text-gray-900 flex flex-wrap justify-start items-center">
                  <div className="w-fullinline  md:text-base  space-y-3">
                    <div className="flex items-center">
                      <span className="md:text-base lg:text-xl capitalize">
                        {fullname}
                      </span>
                      <span className="md:text-base lg:text-xl">
                        {verified ? (
                          <HiBadgeCheck className="text-blue-400 text-xl md:text-2xl" />
                        ) : (
                          " "
                        )}
                      </span>
                    </div>
                    <div className="w-full flex-wrap space-y-2">
                      <div className="flex items-center flex-wrap space-x-2 md:space-x-4 divide-x-4 ">
                        <div className=" ">@{username}</div>
                      
                      </div>
                      <div className="text-xs md:text-sm pt-2 flex item-center w-full   justify-between space-x-10 md:space-x-24">
                        <div>{follower} Followers </div>
                        <div>{following} Following </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/5  flex-wrap flex items-center justify-center text-xs md:text-base">
                  <div
                    onClick={clearStorage}
                    className=" hidden md:flex mt-4  transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110 hover:bg-red-500  items-center rounded bg-black/70   px-3 py-1 text-white cursor-pointer"
                  >
                    Sign Out{"   "}
                    <BiLogOut />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-12 shadow-sm text-gray-900">
            <div className=" bg-white mt-4 px-4 mx-8 md:mx-24 py-6 md:px-20 rounded-lg">
              <div className="flex flex-wrap justify-between items-center pb-4 rounded-lg shadow-xl mb-8">
                <div
                  onClick={profile}
                  className={`w-1/4 flex justify-center items-center  cursor-pointer text-xs md:text-base ${
                    +state.profile ? `text-blue-600 font-bold` : ` `
                  }`}
                >
                  <span className="hidden md:block pt-2">
                    <FaUser />
                  </span>
                  {"  "}
                  <span className="block pt-2 ">Profile</span>
                </div>
                <div
                  onClick={follows}
                  className={`w-1/4 flex justify-center items-center  cursor-pointer text-xs md:text-base ${
                    +state.follows ? `text-blue-600 font-bold` : ` `
                  }`}
                >
                  <span className="hidden md:block pt-2">
                    <FaUserFriends />
                  </span>
                  {"  "}
                  <span className="block pt-2">Followers</span>
                </div>
                {/* <div
                  onClick={socialsSettings}
                  className={`w-1/4 flex justify-center items-center  cursor-pointer text-xs md:text-base ${
                    +state.socials ? `text-blue-600 font-bold` : ` `
                  }`}
                >
                  <span className="hidden md:block pt-2">
                    <ImUsers />
                  </span>
                  {"  "}
                  <span className="block pt-2">Socials</span>
                </div> */}
                <div
                  onClick={setting}
                  className={`w-1/4 flex justify-center items-center  cursor-pointer text-xs md:text-base ${
                    +state.settings ? `text-blue-600 font-bold` : ` `
                  }`}
                >
                  <span className="hidden md:block pt-2">
                    <FaUserEdit />
                  </span>
                  {"  "}
                  <span className="block pt-2">Settings</span>
                </div>
              </div>

              {state.profile ? <Info /> : null}
              {state.follows ? <Follows /> : null}
              {/* {state.socials ? <SocialsSettings /> : null} */}
              {state.settings ? <Settings /> : null}
            </div>
          </section>{" "}
        </Fragment>
      )}
      <BottomNav />
      <div className="hidden md:inline-block w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
