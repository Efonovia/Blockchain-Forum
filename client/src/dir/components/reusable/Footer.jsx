import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Fragment>
      <footer className=" bg-blue shadow-t-xl shadow-red-500 w-full text-center pb-4 pt-8 md:mt-20 z-99 relative ">
         
        <div className=" flex-wrap flex items-center justify-between py-4  text-white">
          <div className="w-1/2 md:w-1/4">
            <h5 className="text-base md:text-xl font-semibold text-white">
              Quick Links
            </h5>
            <ul className=" pt-3 text-xs md:text-smfont-medium space-y-1">
                <li>
                  {" "}
                  <Link to='/'> Home</Link> {" "}
                </li>
              <li>
                {" "}
                <Link to='/login'> Login</Link> {" "}
              </li>
              <li>
                {" "}
                <Link to='/register'> Register</Link> {" "}
              </li>
         
            </ul>
          </div>

    

          <div className="w-1/2 md:w-1/4 mt-10 md:mt-0">
            <h5 className="text-base md:text-xl font-semibold text-white">
              Legal
            </h5>
            <ul className="block pt-3 text-xs md:text-smfont-medium space-y-1">
              <li>
                {" "}
              </li>
              <li>
                {" "}
                <Link to='#'> Terms and Conditions</Link> {" "}
              </li>
              <li>
                {" "}
                <Link to='#'> Privacy Policy</Link> {" "}
              </li>
            </ul>
          </div>

          <div className="w-1/2 md:w-1/4 mt-10 md:mt-0">
            <h5 className="text-base md:text-xl font-semibold text-white">
              Contact info
            </h5>
            <ul className="block pt-3 text-xs md:text-smfont-medium space-y-2">
            <li>
                {" "}
                <Link to='#' >About Us</Link> {" "}
              </li>

              <li>
                {" "}
                <Link to='#' >Contact Us</Link> {" "}
              </li>
              
            </ul>
          </div>
        </div>
  
        <hr className=" opacity-75 backdrop-filter backdrop-opacity-80 bg-gray-900 text-center" />
        <div className="pt-12 font-medium text-white">&copy; FORUM 2023</div>
      </footer>
    </Fragment>
  );
}
