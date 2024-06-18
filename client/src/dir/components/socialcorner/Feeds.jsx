import React, { Fragment, useEffect, useState } from "react";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { CgComment } from "react-icons/cg";
import { IoMdShareAlt } from "react-icons/io";
import { HiBadgeCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ShareSocials } from "../reusable/ShareSocials";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../context/userAuth/useAuth";

export const Feeds = ({
  text,
  fullname,
  postImage,
  profileAvatar,
  isVerified,
  likeAction,
  likeCount,
  commentCount,
  shareAction,
  commentAction,
  postedOn,
  postID,
  refr,
user_id,
checkShowLike
}) => {
  const link = `/post-details/${postID}/${refr}`; 

  const {id} = useAuth();
  const [showShare, setshowShare] = useState(false);

  const [animateLike, setAnimateLike] = useState(false);
  const [localLikeAction, setlocalLikeAction] = useState(null);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  

useEffect(() => {
  
  if(checkShowLike){
    setlocalLikeAction(true)
  } else {
    setlocalLikeAction(false)
  }

}, [checkShowLike])

  const handleLikeClickLike = async () => {

    setLocalLikeCount(localLikeCount + 1);
    setlocalLikeAction(true);

    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 500);
    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_BLOG_USER}/like/${postID}`, {
          user_id: id,
        })
        .then(async (result) => {
    setlocalLikeAction(true);
        });
    } catch (err) {
      console.log("err");
    }
  };

  const handleLikeClickDisLike = async () => {

    setLocalLikeCount(localLikeCount - 1);
    setlocalLikeAction(false);
    // setShowLike(false);

    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 500);

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_BLOG_USER}/unlike/${postID}`, {
          user_id: id,
        })
        .then(async (result) => {
    setlocalLikeAction(false);
        });
    } catch (err) {
      console.log("err");
    }
  };

 

  return (
    <Fragment>
      <div className="w-full px-2 md:px-10 py-2 md:py-4 ">
        <div className="px-3 py-3 cursor-pointer  shadow-[0_0_5px_7px] rounded-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] shadow-blue-500/10 w-full flex-wrap font-light  h-auto">
          <Link to={`/user-details-other/${fullname}`}>
            <section className="w-full flex items-center justify-start space-x-3">
              <div className="text-xs ">

                
                {profileAvatar ? <img
                  src={`${import.meta.env.VITE_REACT_APP_MAIN_HOST}/${profileAvatar}`}
                  className="rounded-full h-12 w-12 text-xs"
                  alt="user_profile_image"
                />: <FaUserCircle  className="h-12 w-12 text-[#090abb]/20"/>}
              </div>
              <div className="flex-1 flex-wrap justify-start  text-sm font-semibold items-center ">
                <div className="text-base font-normal flex items-center capitalize">
                  {" "}
                  @{fullname}{" "}
                  {isVerified ? (
                    <HiBadgeCheck size={20} className="text-blue-400 ml-2" />
                  ) : null}
                </div>
                <div className="font-light text-[10px] capitalize">{postedOn}</div>
              </div>
            </section>
          </Link>
          <Link to={link}>
            <section className="pt-3 flex-1 w-full">
              {postImage ? (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_MAIN_HOST}/${postImage}`}
                  className="max-h-60 md:max-h-96 w-full"
                  alt="user_post"
                />
              ) : null}
            </section>
            <div className="text-sm pt-3">{text}</div>
          </Link>
          <div className="flex w-full pt-2  border-t mt-3 justify-between items-center">
            <div className="w-1/3 flex justify-start ">
              <div className="w-full flex items-center space-x-2">
                {localLikeAction ?  (
                  <AiFillHeart
                    onClick={() => handleLikeClickDisLike()}
                    size={20}
                    className={`text-red-600 ${
                      animateLike ? "animate-like" : ""
                    }`}
                  />
                ) :  
                ( 
                  <AiOutlineHeart
                    onClick={() => handleLikeClickLike()}
                    size={20}
                    className={`transition duration-500 ease-in-out transform hover:-translate-z-1 hover:scale-110 ${
                      animateLike ? "animate-like" : ""
                    }`}
                  />
                ) }
                <style jsx>{`
                  @keyframes bounce {
                    0% {
                      transform: scale(1);
                    }
                    50% {
                      transform: scale(1.2);
                    }
                    100% {
                      transform: scale(1);
                    }
                  }
                  .animate-like {
                    animation-name: bounce;
                    animation-duration: 0.5s;
                  }
                `}</style>

                <span className=" md:inline-block text-xs md:text-sm">
                  {localLikeCount}
                </span>
              </div>
            </div>
            <Link
              to={`${link}`}
              className="w-1/3 animate hover:animate-bounce flex items-center space-x-2 justify-center "
            >
              <CgComment onClick={likeAction} size={20} />
              <span className="hidden md:inline-block">comments</span>
              <span className="  text-xs md:text-sm">{commentCount}</span>
            </Link>

            <div
              onClick={() => setshowShare(!showShare)}
              className="w-1/3 flex justify-end items-center space-x-3 transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110"
            >
              <IoMdShareAlt size={20} className="text-blue-400" />{" "}
              <span className="hidden md:inline-block">Share</span>
            </div>
          </div>
        </div>
      </div>
      {showShare ? <ShareSocials url={`${import.meta.env.VITE_REACT_APP_LINK_MAIN}/post-details/${postID}/${refr}`} title={`@${fullname}`} /> : null}
    </Fragment>
  );
};

