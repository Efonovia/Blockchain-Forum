import React from "react";
import { GoNote } from "react-icons/go";
import { FaComments } from "react-icons/fa";

import CommentsForm from "../../components/socialcorner/CommentsForm";
import Comments from "../../components/socialcorner/Comments";
import Footer from "../../components/reusable/Footer";
import TopNav from "../../components/reusable/TopNav";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/reusable/Loader";
import axios from "axios";
import { useQuery } from "react-query";
import AsideUser from "../../components/reusable/AsideUser";
import useAuth from "../../context/userAuth/useAuth";

export default function PostComment() {
  axios.defaults.withCredentials = true;
  const {username} = useAuth()
  const { postID } = useParams();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery(
    ["all-users-posts-blog"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BLOG_USER}/blog-post/${postID}/data`
      )
  );

  if (isLoading) {
    return <Loader />;
  }

 

  if (isError) {
    navigate('/page-not-found');
  }

  const handlePostDate = (postDate) => {
    const currentDate = new Date();
    const dateDifference =
      (currentDate - new Date(postDate)) / (1000 * 60 * 60 * 24);

    if (dateDifference < 1) {
      return "today";
    } else if (dateDifference < 2) {
      return "yesterday";
    } else if (dateDifference < 7) {
      return `${Math.floor(dateDifference)} days ago`;
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(new Date(postDate));
    }
  };
  return (
    <div className="w-full bg-inherit">
      <TopNav classColor="bg py-2" />

      <div className="w-full pt-1 px-4 pl-10">
        <div className="text-2xl md:text-3xl font-bold flex items-center bg-blue-100/10 ">
          <div className="text-2xl md:text-3xl font-bold flex items-center text-[#090abb] p-3 rounded-full">
            <GoNote className="text-white" /> <span className="pl-2" />
            Post
          </div>
        </div>
      </div>
        <div className="w-[5%]">

{username ? <AsideUser /> : null}
        </div>
      <div className="w-full flex-wrap mt-3 md:flex relative">
        <section className="w-full   h-full ">
          {data ? (
            <Comments
                  key={data?.data?.id}
              text={data?.data?.content}
              fullname={data?.data?.users.username}
              isVerified={data?.data?.users.verified}
              postedOn={handlePostDate(data?.data?.createdAt)}
              profileAvatar={data?.data?.users.profile_picture}
              bg_image={data?.data?.images?.length < 2 ? data?.data?.images : null}
              imgStatus
              signedPost
            />
          ) : null}

          <div className="px-2 md:px-12">
            {username ?
            <CommentsForm info={postID} /> : null }
          </div>
          <div className="w-full pt-3 px-4 pl-10">
            <div className="my-8 text-2xl md:text-3xl font-bold flex items-center bg-blue-100/10 ">
              <div className="text-2xl md:text-3xl font-bold flex items-center text-[#090abb] p-3 rounded-full ">
                <FaComments className="text-[#090abb]" />{" "}
                <span className="pl-2"></span>
                Comments
              </div>
            </div>
          </div>
          <div>
            {data
              ? data?.data?.usercomments.map((datas, index) => (
                  <Comments
                  key={++index}
                    text={datas.comments}
                    fullname={datas.users.username}
                    isVerified={datas.users.verified}
                    postedOn={handlePostDate(datas.createdAt)}
                    profileAvatar={datas.users.profile_picture}
                    bg_image={false}
                    showtag
                  />
                ))
              : null}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
