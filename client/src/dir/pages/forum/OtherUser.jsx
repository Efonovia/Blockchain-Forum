import React from "react";
import { HiBadgeCheck, HiUsers, HiOutlineUsers } from "react-icons/hi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook, BsInstagram, BsWindowSidebar } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import AsideUser from "../../components/reusable/AsideUser";
import useAuth from "../../context/userAuth/useAuth";
import TopNav from "../../components/reusable/TopNav";
import BottomNav from "../../components/reusable/BottomNav";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../../components/reusable/Loader";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function OtherUser({ postsLink }) {
  axios.defaults.withCredentials = true;
  const { id, myFollowing } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  const [first, setfirst] = useState(false);
  const { data, isError, isLoading } = useQuery(
    ["usesr-pofile-other"],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_USER}/user/${username}`)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    navigate("/user-not-found");
  }

  if (data) {
    if (data.data.id === id) {
      navigate("/user-profile");
    }
  }

  const handleFollows = async (e) => {
    setfirst(!first);
    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/follows/${e}`, {
          follower_id: await id,
        })
        .then(async (result) => {
          // console.log(result);
        });
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnfollow = async (e) => {
    setfirst(!first);

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/unfollow/${e}`, {
          follower_id: await id,
        })
        .then(async (result) => {
          // console.log(result);
        });
    } catch (err) {
      // console.log(err);
    }
  };



  
  return (
    <div className="w-full">
      <TopNav classColor="bg py-2" />

      <div className="w-full flex-wrap flex bg- red-400">
        {id ? (
          <aside className="w-full md:w-[5%]">
            <AsideUser />
          </aside>
        ) : null}
        <div className="w-full md:w-[65%]">
          <section className="shadow-inner">
            <div className="rounded-lg  mt-16   md:mx-12 pt-3 bg-gray-100 ">
              <div className="w-full flex items-center bg-white px-4 py-6 md:px-20 rounded-b-lg shadow-xl  ">
                <div className="">
                  {data.data && data.data.profile_picture.length > 2 ? (
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_MAIN_HOST}/${
                        data.data.profile_picture
                      }`}
                      alt="dp"
                      className="text-xs inline border-double border-4 border-gray-400 transform sm:transform-gpu md:transform-none  rounded-full h-16 w-16 md:h-32 md:w-32 "
                    />
                  ) : (
                    <FaUserCircle className="h-12 w-12 text-[#090abb]/20" />
                  )}
                </div>

                <div className=" pl-3 w-3/5 text-gray-900 flex flex-wrap justify-start items-center">
                  <div className="w-2/3 inline  md:text-base  space-y-3">
                    <span className="text-sm md:text-base  flex items-center capitalize">
                      @{data ? data.data.username : null}
                      {data && data.data.verified ? (
                        <HiBadgeCheck size={20} className="text-blue-400" />
                      ) : null}
                    </span>
                  </div>

                  <div className="w-2/3 inline  md:text-base  space-y-3">
                    <span className="md:text-base lg:text-xl flex items-center">
                      {data ? data.data.fullname : null}
                    </span>
                  </div>
                  <div className="w-full flex-wrap space-y-2">
                    <div className="text-xs md:text-sm pt-2 flex item-center w-full  justify-start md:justify-between space-x-10 md:pr-8 ">
                      <div>
                        {data ? data.data.follower_count : null} Followers{" "}
                      </div>
                      <div>
                        {data ? data.data.following_count : null} Following{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/5  flex items-center justify-center text-xs md:text-base">
                  {id ? data && myFollowing.includes(data.data.id) ? (
                    <div
                      onClick={() => handleUnfollow(data.data.id)}
                      className="flex  items-center rounded-xl bg-blue px-3 py-1 text-white cursor-pointer"
                    >
                      {!first ? "Unfollow" : "Follow"} <HiUsers />
                    </div>
                  ) : (
                    <div
                      onClick={() => handleFollows(data.data.id)}
                      className="flex  items-center rounded-xl bg-blue px-3 py-1 text-white cursor-pointer"
                    >
                      {!first ? "Follow" : "Unfollow"} <HiUsers />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-3 shadow-sm   text-gray-900 px-8 md:px-24 text-sm">
            {data ? (
              <div className="w-full flex items-center  justify-center bg-white mt-1 px- 4 py-2 md:px-20 rounded-lg">
                {data.data.instagram && data.data.instagram !== 'Not Available' ? (
                  <div className="flex-1">
                    <div>
                      {" "}
                      <div className="flex  items-center">
                        <a
                          href={`https://instagram.com/${data.data.instagram}`}
                          className="flex  mt-3 items-center rounded bg-gradient-to-r from-rose-400 to-orange-300 px-3 py-1 text-white cursor-pointer"
                        >
                          Instagram {"   "}
                          <BsInstagram className="ml-2" /> {"   "}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex-1">
                  <div>
                    {" "}
                    <div className="flex  items-center">
                      <Link
                        to={`/posts-ref/${data.data.username}/posts/${data.data.id}`}
                      >
                        <div
                          onClick={postsLink}
                          className="flex text-xs md:text-sm mt-3 items-center rounded bg-blue-900 px-3 py-1 text-white cursor-pointer"
                        >
                          View all Posts{"   "}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {data.data.twitter && data.data.twitter !== 'Not Available' ? (
                  <div className="flex-1">
                    <div>
                      {" "}
                      <div className="flex  items-center">
                        <a
                          href={`https://twitter.com/${data.data.twitter}`}
                          className="flex  mt-3 items-center rounded bg-blue-400 px-3 py-1 text-white cursor-pointer"
                        >
                          Twitter {"   "}{" "}
                          <AiFillTwitterCircle className="ml-2" /> {"   "}
                          {"   "}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : null}
            <div className="flex-wrap   w-full h-full pt-4">
              <div className="text-sm md:text-xl font-bold">Bio</div>

              <div className="text-light">{data ? data.data.bio : null}</div>
            </div>
          </section>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
