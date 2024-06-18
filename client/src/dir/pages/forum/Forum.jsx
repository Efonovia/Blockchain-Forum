import React, { Fragment, useState } from "react";
import { Feeds } from "../../components/socialcorner/Feeds";
import MakeSocialPost from "../../components/socialcorner/MakeSocialPost";
import AsideUser from "../../components/reusable/AsideUser";
import TopNav from "../../components/reusable/TopNav";
import BottomNav from "../../components/reusable/BottomNav";
import axios from "axios";
import { useQuery } from "react-query";
import SkeletonLoader from "../../components/reusable/SkeletonLoader";
import useAuth from "../../context/userAuth/useAuth";

export default function Forum() {
  axios.defaults.withCredentials = true;

  const [infoData, setData] = useState("");

  const { username } = useAuth();
  const { isLoading, data, isError } = useQuery("feeds", async () => {
    try {
      const dataAPI = `${import.meta.env.VITE_REACT_APP_BLOG_USER}/blog-post`;
      const response = await axios.get(dataAPI);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

 
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
    <Fragment>
      <div className="w-full bg-inherit mb-12 md:mb-0">
        <TopNav classColor="bg py-2" />

        <div className="text-red-400 px-2">{infoData}</div>

        <div className="w-full flex-wrap md:flex relative">
          {username ? (
            <aside className="hidden md:inline-block w-[5%] ">
              <AsideUser />
            </aside>
          ) : null}

          <section className="flex-1 md:w-[60%]  h-full">
            {username ? <MakeSocialPost /> : null}

            <div className="mb-8" />

            {/* this is a mock data, map thorugh it */}
            {data && data
              ? data?.map((datas) => {
                  return (
                    <Feeds
                      key={datas.ref  }
                      isVerified={datas.users.verified}
                      fullname={datas.users.username}
                      profileAvatar={null}
                      commentAction={null}
                      likeAction={null}
                      likeCount={datas?.likes_count}
                      commentCount={datas.comments_count}
                      postedOn={handlePostDate(datas.createdAt)}
                      shareAction={null}
                      postID={datas?.id}
                      refr={datas.ref}
                      postImage={null}
                      text={datas?.content}
                      checkShowLike={5}
                    />
                  );
                })
              : null}

            {isLoading ? <SkeletonLoader /> : null}
          </section>
        </div>
      </div>
      <BottomNav />
    </Fragment>
  );
}
