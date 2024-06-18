import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";

function Card({
  tag,
  bg_image,
  title,
  date,
  id,
}) {

  return (
    <Link to={`/blog-news/${id}/${title}`} className=" flex  items-center w-full justify-center"> 
      <div className="relative w-[22.5rem]  md:w-[34rem] h-[22rem] md:h-[29rem]   overflow-hidden rounded-2xl shadow-lg bg-white mb-4">
        <img
          className=" text-xs rounded-t-2xl h-[16rem] md:h-[23rem] bg-cover bg-no-repeat bg-center w-full"
           src={`${import.meta.env.VITE_REACT_APP_MAIN_IMAGE}/${bg_image}`}
          alt="KMA_blog"
        />
        <div className="px-2 py-2  w">
          <div className="cursor-pointer text-sm lg:text-base font-bold max-w-md   hover:text-blue-600 opacity-75">
             
            {title}  
          </div>
        </div>
       

        <div className="px-2 absolute bottom-0 left-0  pb-4 flex justify-begin items-center space-x-2 text-xs">
          
          <div className="font-bold opacity-75">
            <BiTimeFive />
          </div>
          <div className="font-light opacity-75">{date}</div>
          
        </div>
      </div>
    </Link>
  );
}

export default Card;
