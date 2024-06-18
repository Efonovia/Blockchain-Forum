import React, { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { loggedInLinks, sidelinks } from "./sidelinks";
import { Link } from "react-router-dom";
import useAuth from "../../context/userAuth/useAuth";

const SmallSideBar = ({ close }) => {
  const { username } = useAuth();

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
          className=" z-99 w-full h-full bg-blue-800/40 fixed bottom-0 top-0 left-0"
        >
          <div onClick={close} className="text-white p-3 cursor-pointer">
            <AiFillCloseCircle size={36} className="text-white" />
            <h6>Close</h6>
          </div>

          <div className="absolute top-0 right-0 w-[80%] md:w-[40%] lg:w-[35%] bg  h-full">
            <div className="flex-wrap">
              <div className=" h-16  text-2xl text-white flex items-center overflow-hidden">
              BF
              </div>

              <div className="flex-wrap">
                {username
                  ? loggedInLinks.map((data) => (
                      <Link to={data.ref} key={data.id}>
                        {/* <a href={data.page} key={data.id}> */}
                        <div className="w-full cursor-pointer py-3 border-b border-gray-300/25 flex justify-start pl-3 text-white text-sm">
                          {data.title}
                        </div>
                        {/* </a> */}
                      </Link>
                    ))
                  : sidelinks.map((data) => (
                      <Link to={data.ref} key={data.id}>
                        {/* <a href={data.page} key={data.id}> */}
                        <div className="w-full cursor-pointer py-3 border-b border-gray-300/25 flex justify-start pl-3 text-white text-sm">
                          {data.title}
                        </div>
                        {/* </a> */}
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Fragment>
  );
};

export default SmallSideBar;
