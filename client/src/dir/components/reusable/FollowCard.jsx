import React, { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../context/userAuth/useAuth";
import { useState } from "react";

export const FollowCard = ({
  imageAvatar,
  isVerified,
  followsYou,
  name,
  bio,
  following_count,
  follower_count,
  handleFollow,
  following,
}) => {
  axios.defaults.withCredentials = true;
  const {  id } = useAuth();
  const [first, setfirst] = useState(true)
 

  const handleFollows = async (e) => {
    setfirst(!first)

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
    setfirst(!first)

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
    <div className="w-full my-8 px-3 h-32 rounded bg-white shadow-[0_0_5px_15px] drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] shadow-blue-500/10  flex justify-start">
      <Link to={`/user-details-other/${name}`} className="flex w-full">
        <div className=" flex items-center justify-center ">

          {imageAvatar ? <img
            src={`${import.meta.env.VITE_REACT_APP_MAIN_HOST}/${imageAvatar}`}
            alt="user-avatar"
            className="rounded-full h-12 w-12 md:w-24 md:h-24"
          /> : <FaUserCircle  className="h-12 w-12 text-[#090abb]/20"/>}
        </div>
        <div className="w-[60%]   flex items-center flex-wrap pl-2 md:pl-5  ">
          <div className=" space-y-2   flex-wrap w-full ">
            <div className="text-xs capitalize  md:text-sm flex items-center  pt-3 text-[#090abb]">
              @{name}{" "}
              {isVerified ? (
                <HiBadgeCheck className="ml-0 md:ml-2 text-blue-400" />
              ) : null}
            </div>

            <div className="text-[12px] md:text-xs font-light flex  ">
              <span className="md:hidden  ">
                {bio.slice(0, 20)}
              </span>
              <span
                className="hidden md:inline-block 
          "
              >
                {bio.slice(0, 100)}<span className="font-extralight">...</span>
              </span>
            </div>
              <div className=" w-full text-[10px] md:text-xs font-light  flex space-x-2 md:space-x-24">
                <span>{follower_count}  followers</span>
                <span>{following_count} following</span>
              </div>
            </div>
        </div>
      </Link>

      <div className="w-1/3 flex justify-center items-center">
        <div className="w-full flex-wrap">
          <div className="text-center text-[10px] md:text-sm pb-3 font-light">
            {followsYou ? "Following you" : ""}
          </div>
          {following ? 
          <div 
          onClick={() => handleUnfollow(handleFollow)} 
       className="text-[10px] md:text-sm w-auto text-center bg-blue rounded-lg px-1 md:px-4 py-1 text-white cursor-pointer ">
       
      {first ?  'Unfollow' : 'Follow'}

      </div>
      : <div 
              onClick={() => handleFollows(handleFollow)} 
           className="text-[10px] md:text-sm w-auto text-center bg-blue rounded-lg px-1 md:px-4 py-1 text-white cursor-pointer ">
             {first ?  'Follow' : 'Unfollow'}
        
          </div>

          }
        </div>
      </div>
    </div>
  );
};
