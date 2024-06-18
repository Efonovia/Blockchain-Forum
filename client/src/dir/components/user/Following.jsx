import React, { useEffect, useState } from "react";
import { FollowCard } from "../reusable/FollowCard";
import { FaUserFriends } from "react-icons/fa";
import AsideUser from "../reusable/AsideUser";
import TopNav from "../reusable/TopNav";
import { Myfollowers } from "./Myfollowers";
import { Myfollowing } from "./Myfollowing";
import BottomNav from "../reusable/BottomNav";

export default function Following() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [border, setBorder] = useState("ext-2xl md:text-3xl");
  const [borderFollower, setBorderFollower] = useState("opacity-60 text-sm md:text-xl");
  const  [showFollower, setshowFollower] = useState(true);

  const followerControl = () => {
    setBorder("opacity-60 text-sm md:text-xl");
    setBorderFollower("text-2xl md:text-3xl");
    setshowFollower(false);
  };

  const followingControl = () => {
    setBorderFollower("opacity-60 text-sm md:text-xl");
    setBorder(" text-2xl md:text-3xl");
    setshowFollower(true);
  };

  return (
    <div className="w-full  mb-14 md:mb-0">
      <TopNav classColor="bg py-2" />

      <div className="w-full flex  pt-3  ">
        <div className="hidden md:inline-block md:w-[5.25%] 100vh mr-2"></div>
        <div className="flex-1 text-2xl md:text-3xl font-bold justify-between md:justify-start flex items-center bg-blue-100/10 ">
          <div
            onClick={followingControl}
            className={`cursor-pointer text-2xl md:text-3xl font-bold flex items-center ${border} p-3 text-white`}
          >
            <FaUserFriends className="text-white blue" /> {"  "}
            <span className="pl-2 blue">Following</span>
          </div>

          <div
            onClick={followerControl}
            className={`md:pl-32 cursor-pointer  font-bold flex items-center ${borderFollower} p-3 text-white`}
          >
            <FaUserFriends className="text-white blue" /> {"  "}
            <span className="pl-2  blue">Followers</span>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <aside className="hidden md:inline-block w-[5%] ">
          <AsideUser />
        </aside>
        <div className="w-full md:w-[60%] px-4">
          {showFollower ? <Myfollowing /> : <Myfollowers />}
        </div>
      </div>
    <BottomNav />

    </div>
  );
}
