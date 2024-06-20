import React from "react";
import { FiUsers } from "react-icons/fi";
import { FaHouseUser, FaUserAlt } from "react-icons/fa";
import LanguageIcon from '@mui/icons-material/Language';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { Link } from "react-router-dom";
import useAuth from "../../context/userAuth/useAuth";


function AsideUser() {
  const { id } = useAuth();
 

  return (
    <div className="w-auto fixed top-20 h-full">
      <aside className=" hidden md:inline-block  md:w-full  overflow-y-clip -z-10   left-0 top-0  shadow-right shadow-xl rounded-full shadow-blue-4050  h-full ">
        <div className="p-1 h-full overflow-y-clip ">
          <div className="relative h-full flex-wrap space-y-10 justify-center items-center">
            {/* replace with orofile picture */}
           
           
            <div className="cursor-pointer flex justify-center items-center">
              <Link to="/">
                <div className="  flex-wrap">
                  <div className="flex justify-center">
                    <FaHouseUser size={24} className="blue " />
                  </div>
                  <div className="text-xs font-light">Home</div>
                </div>
              </Link>
            </div>
            
             <div className="cursor-pointer flex justify-center items-center">
              <Link to="/user-profile">
                <div className="  flex-wrap">
                  <div className="flex justify-center items-center">
                   
                    <FaUserAlt size={24} className="blue " />
                  </div>
                  <div className="text-xs font-light">Profile</div>
                </div>
              </Link>
            </div>
          
            <div className="cursor-pointer flex justify-center items-center">
              <Link to="/following">
                <div className="  flex-wrap">
                  <div className="flex justify-center">
                    <FiUsers size={24} className="blue " />
                  </div>
                  <div className="text-xs font-light">Friends</div>
                </div>
              </Link>
            </div>
          
            <div className="cursor-pointer flex justify-center items-center">
              <Link to="/urlchecker">
                <div className="  flex-wrap">
                  <div className="flex justify-center">
                    <LanguageIcon size={24} className="blue " />
                  </div>
                  <div className="text-xs font-light">URL checker</div>
                </div>
              </Link>
            </div>
          
            <div className="cursor-pointer flex justify-center items-center">
              <Link to={`/complaints/${id}`}>
                <div className="  flex-wrap">
                  <div className="flex justify-center">
                    <HowToVoteIcon size={24} className="blue " />
                  </div>
                  <div className="text-xs font-light">Complaints</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default AsideUser;
