import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { HiBadgeCheck } from "react-icons/hi";
 
import { Link } from 'react-router-dom';

export default function Comments({
    isVerified,
    fullname,
    bg_image,
    text,
    imgStatus,
    signedPost,
    id,
    profileAvatar,
    showtag,
    postedOn
  }) 
  {
  return (
    <div className="all mb-8    px-8 md:px-12  w-full h-auto relative z-99">

      <div className={showtag ? 'invicible border-2 border-gray-500/10 absolute h-32  left-16 md:left-20 -top-20 -z-10 rounded-2xl' : 'hidden'}/>
      
    <div className="z-99 bg-white py-3 px-2 w-full rounded-md  flex-wrap shadow-blue-400/20 shadow-[0_4px_6px_5px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]">
        <div className="w-full ">
        <Link to={`/user-details-other`}>

          <section className="w-full flex items-start z-99 justify-start space-x-3">
            <div className="pb-2">

            {profileAvatar ? <img
                  src={`${import.meta.env.VITE_REACT_APP_MAIN_HOST}/${profileAvatar}`}
                  className="rounded-full h-12 w-12 text-xs"
                  alt="user_profile_image"
                />: <FaUserCircle  className="h-12 w-12 text-[#090abb]/20"/>}
 
            </div>
            <div className="flex-1 flex-wrap justify-start  text-sm font-semibold items-center ">
              <div className="text-base font-normal flex items-center capitalize"> @{`${fullname}`}   {isVerified && <HiBadgeCheck size={20} className="text-blue-400 text-xl md:text2xl" />}</div>{" "}
              <div className="font-light text-xs  capitalize"> 
                {postedOn}
              </div>
            </div>
            <div className='text-xs font-light'>
                {signedPost ? '.' : ''}
            </div>
          </section>
          </Link>
        </div>
        <div className="w-full md:flex   font-light">
          <div
            className={`w-full  ${
              bg_image ? "md:w-[30%]" : "hidden"
            }  h-auto max-h-50 text-white`}
          >
            <img
                  src={`${import.meta.env.VITE_REACT_APP_MAIN_HOST}/${bg_image}`}
              alt="user-post-image"
              className="h-full w-full"
            />
          </div>
          <div
            className={`w-full text-xs md:text-sm py-2 md:py-0 px-1 md:px-2 ${
              imgStatus ? "md:w-[70%]" : "md:w-full"
            } `}
          >
             {text}
          </div>
        </div>
      
    </div>
  </div>
  )
}
