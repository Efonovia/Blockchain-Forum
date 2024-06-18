import React, { Fragment, useState } from "react";
import { FollowCard } from "../reusable/FollowCard";
import useAuth from "../../context/userAuth/useAuth";
import Loader from "../reusable/Loader";
import axios from "axios";
import { useQuery } from "react-query";
import SkeletonLoader from "../reusable/SkeletonLoader";

export const Myfollowing =  () => {
  const { id, myFollowing, myFollowers } =  useAuth();
  axios.defaults.withCredentials = true;

  const { data, isError, isLoading } =  useQuery(
    ["following-users"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_USER}/users/${id}/following`
      )
  );

 
  const handleUnfollow = async (e) => {

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/unfollow/${e}`, {
          follower_id: await id,
        })
        .then(async (result) => {
          return
        });
    } catch (err) {
      // console.log(err);
    }
  };


   


 
 
  return (
    <Fragment>
      <div className="w-full">
        {isLoading && <SkeletonLoader />}
      </div>
      {data
        ? data?.data?.map((datas, index) => (
            <FollowCard
            key={datas.id}
              name={datas.username}
              follower_count={datas.follower_count}
              following_count={datas.following_count}
              bio={datas.bio === 'Not Updated' ? '' : datas.bio}
              index={index}
              isVerified={datas.verified}
              handleFollow={datas.id}
              following
              
              
              followsYou={ myFollowers ? myFollowers.includes(datas.id)
                ? true
                : false  : false 
            }
              imageAvatar={datas.profile_picture?.length > 2 ? datas.profile_picture : false}
            />
          ))
        : "Loading..."}
         

    </Fragment>
  );
};
