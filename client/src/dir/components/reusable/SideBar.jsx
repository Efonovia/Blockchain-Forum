import React, { Fragment } from "react";
import * as Img from "./Images";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { sidelinks, loggedInLinks } from "./sidelinks";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SideBar = ({ close, loggedIn }) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const clearStorage = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_USER}/logout`)
      .then((data) => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        alert("Error updating data");
      });
  };
  return (
    <Fragment>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ y: 1 }}
          transition={{ delay: 0.3 }}
          whileInView={{ opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          style={{ zIndex: 100 }}
          className=" z-99 w-full h-full bg-[#121212]/75 fixed bottom-0 top-0 left-0"
        >
          <div className="absolute top-0 left-0 w-full bg-white text-black  h-auto">
            <div className="flex-wrap">
              <div className="pl-4 h-16  text-2xl text-blue flex items-center overflow-hidden">
              BF
              </div>

              <div className="flex-wrap">
                {sidelinks.map((data) => (
                  <Link to={data.ref} key={data.id}>
                    {/* <a href={data.page} key={data.id}> */}
                    <div className="w-full cursor-pointer py-3 border-b border-blue-300/25 flex justify-start pl-3 text-black text-sm font-semibold">
                      {data.title}
                    </div>
                    {/* </a> */}
                  </Link>
                ))}

                {loggedIn ? (
                  <div
                    onClick={clearStorage}
                    className="w-full cursor-pointer py-3 border-b border-blue-300/25 flex justify-start pl-3 text-black text-sm font-semibold"
                  >
                    Logout
                  </div>
                ) : <div
                className="w-full cursor-pointer py-3 border-b border-blue-300/25 flex justify-start pl-3 text-black text-sm font-semibold"
              >
             <Link to='/login'> Login
             </Link>   
              </div>}
              </div>
            </div>
          </div>

          <div
            onClick={close}
            className="absolute z-99 right-2 top-0 float-right text-black p-3 cursor-pointer"
          >
            <AiFillCloseCircle size={40} className="" />
            <h6 className="text-sm text-center">Exit</h6>
          </div>
        </motion.div>
      </AnimatePresence>
    </Fragment>
  );
};

export default SideBar;
