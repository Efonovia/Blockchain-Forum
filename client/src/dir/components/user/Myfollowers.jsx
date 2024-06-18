import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FollowCard } from "../reusable/FollowCard";
import useAuth from "../../context/userAuth/useAuth";
import Loader from "../reusable/Loader";
import axios from "axios";
import { useQuery } from "react-query";
import SkeletonLoader from "../reusable/SkeletonLoader";

export const Myfollowers = () => {  
  axios.defaults.withCredentials = true;

  const { id, myFollowing, myFollowers } = useAuth();

  const { data, isError, isLoading } = useQuery(
    ["followers-users"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_USER}/users/${id}/followers`
      )
  );

 
 

  return (
    <Fragment>
      <div className="w-full">
        {isLoading && <SkeletonLoader />}
      </div>
     {data
        ? data.data.map((datas, index) => (
            <FollowCard
            key={datas.id}
            name={datas.username}
              follower_count={datas.follower_count}
              following_count={datas.following_count}
              bio={datas.bio === 'Not Updated' ? '' : datas.bio}
              index={index}
              imageAvatar={datas.profile_picture.length > 2 ? datas.profile_picture : false}
              isVerified={datas.verified}
              followsYou
              following={ myFollowing ? myFollowing.includes(datas.id)
                ? true
                : false  : false 
            }
              handleFollow={datas.id}
            />
          ))
        : " No Follower"}   
    </Fragment>
  );
};
