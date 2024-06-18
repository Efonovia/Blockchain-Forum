import React, { useEffect, useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";

export const ShareSocials = ({ url, title }) => {
  const [show, setShow] = useState("fixed");

  const hideMe = () => {
    setShow("hidden");
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };
  return (
    <div
      style={{ zIndex: 99 }}
      className={`w-full fixed inset-0 z-100 h-full bg-blue-600/20 ${show} top-0`}
    >
      <div className="  h-screen rounded-xl  flex items-center justify-center">
        <div className="bg-white p-6 w-4/5 md:w-[500px]  rounded-xl flex-wrap">
          <div className="w-full blue text-center text-xl md:text-3xl font-bold">
            Share post
          </div>
          <div className="flex justify-center items-center">
            <div className="flex justify-center">
              <input
                type="text"
                disabled
                className="border rounded p-2 mt-3 w-90 flex justify-center text-center opacity-80"
                value={url}
              />
            </div>
            <div
              onClick={handleCopy}
              className="flex justify-center items-center"
            >
              <span className="cursor-pointer  transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110 p-1 rounded flex items-center justify-center ">
                {" "}
                <FiCopy className="text-gray-700 text-3xl hover:text-blue-600" />
              </span>
            </div>
          </div>

          <div className="flex justify-center py-2 items-center">OR</div>

          <div className="flex justify-center items-center space-x-4">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <BsFacebook className="transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110  cursor-pointer text-blue-700 text-2xl md:text-3xl" />
            </a>

            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <AiFillTwitterCircle className="transition duration-500 ease-in-out  transform hover:-translate-z-1 hover:scale-110  cursor-pointer text-blue-400 text-2xl md:text-4xl" />
            </a>
          </div>
          <div className=" w-full text-center my-4">
            <div />
            Share directly to Facebook and Twitter.{" "}
          </div>

          <div
            onClick={hideMe}
            className="bg-red-400 mt-12  bg-blue text-white cursor-pointer rounded-full px-2 py-1  text-center"
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
};
