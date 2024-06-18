import React, { Fragment } from "react";
import { FollowCard } from "../reusable/FollowCard";
import useAuth from "../../context/userAuth/useAuth";
import Loader from "../reusable/Loader";
import axios from "axios";
import { useQuery } from "react-query";
import SkeletonLoader from "../reusable/SkeletonLoader";

export const AllUsers = () => {
  axios.defaults.withCredentials = true;

  const { id, myFollowing,
    myFollowers } = useAuth();

  const { data, isError, isLoading } = useQuery(
    ["allUsers"],
    async () => await axios.get(`${import.meta.env.VITE_REACT_APP_USER}/users`)
  );

 

  
 
  return (
    <Fragment>
         <div className="w-full">
               
        {isLoading && <SkeletonLoader />} 
      </div>
      {data
        ? data.data.users
            .slice(0, 20)
            .map((datas, index) => (
              <FollowCard
                key={datas.id}
                name={datas.username}
                follower_count={datas.follower_count}
                following_count={datas.following_count}
                bio={datas.bio} 
              imageAvatar={datas.profile_picture.length > 2 ? datas.profile_picture : false}
                index={index}
                isVerified={datas.verified}
                followsYou={
                  datas.following_ids
                    ? datas.following_ids.includes(`${id}`)
                      ? true
                      : false
                    : false
                }
                following={ myFollowing ? myFollowing.includes(datas.id)
                      ? true
                      : false  : false 
                }
              handleFollow={datas.id}
             
              />
            ))
        : " Please check your internet connection"}

      <div>Cant find the user? Search by username</div>
    </Fragment>
  );
};
