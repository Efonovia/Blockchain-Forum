import React from "react";
import Card from "./Card";
import useAuth from "../../context/userAuth/useAuth";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../reusable/Loader";
import { Fragment } from "react";
import SkeletonLoader from "../reusable/SkeletonLoader";

function BlogList({ sliceMax, key, click }) {
 
  axios.defaults.withCredentials = true;
  const { id } = useAuth();

  const { data, isError, isLoading } = useQuery(
    ["blog-news-admin"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BLOG_ADMIN}/posts-data-all`
      )
  );

 

 


  const handlePostDate = (postDate) => {
    const dateString = postDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  };

  
  return (
    <div className="w-full ">
      <div className="w-full h-auto  flex-wrap     ">
        <div onClick={click} className="w-full    flex-wrap   md:flex items-center justify-around ">
          {isLoading && <SkeletonLoader />}
          {data && data.data.slice(0, sliceMax).map((datas, key) => (
            <div key={key} className="flex md:w-1/2 pt-6 justify-between px-4">
              <Card id={datas.id} bg_image={datas.image} title={datas.title ? datas.title.length > 70 ? (
                <Fragment>

                  {datas.title.slice(0,70)}...
                </Fragment>
                ) : datas.title : datas.title } date={handlePostDate(datas.createdAt)} status={true} />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default BlogList;
