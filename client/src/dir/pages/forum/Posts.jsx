import React from "react";
import { MdOutlineRssFeed } from "react-icons/md";
import TopNav from "../../components/reusable/TopNav";
import useAuth from "../../context/userAuth/useAuth";
import AsideUser from "../../components/reusable/AsideUser";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../../components/reusable/Loader";
import { Feeds } from "../../components/socialcorner/Feeds";
import BottomNav from "../../components/reusable/BottomNav";

export default function Posts() {
  axios.defaults.withCredentials = true;
  const { id: Uid } = useAuth();
  const { username, id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery(
    ["usesr-pofile-posts"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BLOG_USER}/user-post/${id}`
      )
  );

  if (isLoading) {
    return <Loader />;
  }

  

  if (isError) {
    navigate("/user-posts-not-found");
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

      <div className="w-full pt-3 px-4 pl-8 md:pl-24">
        <div className="text-2xl md:text-3xl font-bold flex items-center bg-blue-100/10 ">
          <div className="text-2xl md:text-3xl font-bold flex items-center bg-[#090abb] p-3 rounded-full text-white capitalize">
            <MdOutlineRssFeed className="text-white " />
            {username} Posts
          </div>
        </div>
      </div>

      <div className="w-full flex-wrap mt-8 md:flex relative">
        {username ? (
          <aside className="w-full md:w-[5%]">
            <AsideUser />
          </aside>
        ) : null}
        <section className="w-full md:w-[60%]  h-full">
        {data
              ? data.data.map((datas) => (
                  <Feeds
                    key={datas.id} 
                    isVerified={datas.users.verified}
                    fullname={datas.users.username}
                    profileAvatar={
                      datas.users.profile_picture.length > 2
                        ?  datas.users.profile_picture
                        : null
                    }
                    commentAction={null}
                    likeAction={null}
                    likeCount={datas.likes_count}
                    commentCount={datas.comments_count}
                    postedOn={handlePostDate(datas.createdAt)}
                    shareAction={null}
                    user_id={datas.user_id}
                    postID={datas.id}
                    refr={datas.ref}
                    postImage={
                      datas.image.length > 2
                        ? datas.image
                        : null
                    }
                    text={datas.content}
                    checkShowLike={datas.userbloglikes.some((item) => item.user_id === id) }
                  />
                ))
              : null}
        </section>
      </div>
      <BottomNav />

    </div>
  );
}
