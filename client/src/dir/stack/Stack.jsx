import React, { Fragment, lazy, Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Errors from "../pages/homepages/Errors";
import Forum from "../pages/forum/Forum";
import Posts from "../pages/forum/Posts";
import PostComment from "../pages/forum/PostComment";
import OtherUser from "../pages/forum/OtherUser";
import Following from "../components/user/Following";
import { AuthContext } from "../context/userAuth/AuthContext";
import Loader from "../components/reusable/Loader";
import Signin from "../pages/signin/Signin";
import Signup from "../pages/signin/Signup";
import AdminHome from "../pages/AdminHome";
import AdminLogin from "../pages/AdminLogin";
import URLChecker from "../pages/URLChecker";
import Complaints from "../pages/Complaints";
const UserProfile = lazy(() => import("../pages/user/UserProfile"));


function Stack() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Forum />} />

        <Route path="*" element={<Errors />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/complaints/:userId" element={<Complaints />} />
        <Route path="/urlchecker" element={<URLChecker />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/:adminId/home" element={<AdminHome />} />

        {/* <Route path="/userprofile" element={<UserPage />}/> */}
        <Route
          path="/user-profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />

        {/* post-ref -> view users post in respect to the id */}
        <Route path="/posts-ref/:username/posts/:id" element={<Posts />} />
        {/* feeds post */}

        <Route path="/following" element={<Following />} />

        {/* post-details-comments -> view comments and posts */}
        <Route path="/user-details-other/:username" element={<OtherUser />} />
        <Route path="/post-details/:postID/:refr" element={<PostComment />} />
      </Routes>
    </Suspense>
  );
}

export default Stack;
