import { Fragment } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../context/userAuth/useAuth";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Info() {
  const {
    username,
    email,
    fullname,
    bio,
    verified,
    permission,
    instagram,
    twitter,
    kmpPoint,
  } = useAuth();

  return (
    <Fragment>
      <div className="flex flex-wrap">
        

       

        {/* <div className="w-full flex items-center">
          <div className="w-1/4">
            <div className="py-3 block px-4  text-sm capitalize text-gray-700 ">
              <span className="md:pl-3 font-bold text-xs md:text-xl">
                Email
              </span>
            </div>
          </div>
          <div className="w-3/4 font-light">
            <div className="py-3  md:mt-0 ml-6 cursor-pointer text-sm md:text-base">
              {email}
            </div>
          </div>
        </div> */}

          <div className="w-full flex items-center">
           
          <div className="w-full font-light">
            <div className="py-3 italic md:mt-0 ml-6 font-light cursor-pointer text-sm md:text-base">
              "{bio}"
            </div>
          </div>
        </div>

        <div className="w-full flex items-center">
          
          <div className="w-full font-light  justify-center md:justify-start flex items-center py-3">
            <div className="flex items-center  pb-1    md:mt-0 ml-6 cursor-pointer text-sm md:text-base">
              
              {instagram ? (
                <div className="flex  items-center">
                  <a
                  target="_blank"
                  
                    href={`https://instagram.com/${instagram}`}
                    className="flex  mt-3 items-center rounded bg-gradient-to-r from-rose-400 to-orange-300 px-3 py-1 text-white cursor-pointer"
                  >
                    Instagram  <BsInstagram className="ml-2" />  
                     
                  </a>
                </div>
              ) : null}
            </div>

            <div className="flex items-center  md:mt-0 ml-6 cursor-pointer text-sm md:text-base">
             
              {twitter ? (
                <div className="flex  items-center">
                  <a
                    href={`https://twitter.com/${twitter}`}
                    className="flex  mt-3 items-center rounded bg-blue-400 px-3 py-1 text-white cursor-pointer"
                  >
                    Twitter {"   "} <AiFillTwitterCircle className="ml-2" />{" "}
                    {"   "}
                    {"   "}
                  </a>
                </div>
              ) : null}
            </div>

            <div className="flex items-center  md:mt-0 ml-6 cursor-pointer text-sm md:text-base">
              {twitter ? (
                <div className="flex items-center">
                  <a
                    href={`https://twitter.com/${twitter}`}
                    className="flex text-white mt-3 items-center rounded bg-gradient-to-l px-3 py-1  cursor-pointer"
                  >
                    Email {"   "} <MdOutlineMailOutline className="ml-2 " />{" "}
                    {"   "}
                    {"   "}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>

      
      </div>
    </Fragment>
  );
}
