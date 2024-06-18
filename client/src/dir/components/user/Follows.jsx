import { useState } from "react";
import useAuth from "../../context/userAuth/useAuth";
import { Myfollowers } from "./Myfollowers";
import { Myfollowing } from "./Myfollowing";

export default function Follows() {
  const { username, id } = useAuth();
  

  const [border, setBorder] = useState("font-bold  md:text-xl ");
  const [borderFollower, setBorderFollower] = useState("opacity-60  ");
  const  [showFollower, setshowFollower] = useState(true);

  const followerControl = () => {
    setBorder("font-bold  md:text-xl ");
    setBorderFollower("opacity-60");
    setshowFollower(false);
  };

  const followingControl = () => {
    setBorderFollower("font-bold  md:text-xl");
    setBorder("opacity-60");
    setshowFollower(true);
  };

  return (
    <>
      <div className="flex-wrap w-full ">
        <div className="flex w-full">
          <div className="w-1/4">
            <div
              onClick={followerControl} 
              className="cursor-pointer py-3 block px-4  text-sm capitalize text-gray-700"
            >
              <span className={`md:pl-3  ${border}`}>Followers</span>
            </div>
          </div>
          <div className="w-3/4">
            <div onClick={followingControl} className={`cursor-pointer pl-24 py-3 ${borderFollower}  md:mt-0 ml-6  text-xs `}>
              Following
            </div>
          </div>
        </div>
        <div className="flex flex-wrap h-96 relative overflow-y-scroll px-3 ">
          {showFollower ?<Myfollowing /> : <Myfollowers />  }
        </div>
      </div>
    </>
  );
}
