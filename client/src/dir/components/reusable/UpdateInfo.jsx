import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UpdateInfo = () => {
  const [show, setShow] = useState("fixed");

  const hideMe = () => {
    Cookies.set("profile", "suspend", { expires: 1 }); 
    setShow("hidden");
  };

  return (
    <div style={{zIndex:99}} className={`w-full z-100 h-full bg-blue-600/20 ${show} top-0`}>
      <div className="  h-screen rounded-xl  flex items-center justify-center">
        <div className="bg-white p-6 w-4/5 md:w-[500px]  rounded-xl flex-wrap">
          <div className="w-full blue text-center text-xl md:text-3xl font-bold">
            Update Profile
          </div>
          <div className=" w-full text-center my-4">
            Complete your profile infomation update.<div /> You can update your fullname and other 
            profile  information in the setting.{" "}
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
