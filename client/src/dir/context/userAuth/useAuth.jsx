import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
  useReducer,
} from "react";
import axios from "axios";
import AuthReducer from "./AuthReducer";
import { INITIAL_STATE } from "./AuthContext";
import { useQuery } from "react-query";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState(null);
  const [verified, setVerified] = useState(false);
  const [id, setID] = useState(null);
  const [userID, setUserId] = useState(null);
  const [following, setfollowing] = useState(null);
  const [follower, setfollower] = useState(null);

  // check if user is logged in and keep user logged in
  const { data, isError } = useQuery("userData", async () => {
    try {
      const dataAPI = `${import.meta.env.VITE_REACT_APP_USER}/me`;
      const response = await axios.get(dataAPI);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    localStorage.setItem("user", state.currentUser);
  }, [state.currentUser]);

  useEffect(() => {
    const upDateData = async () => {
      try {
        if (data) {
          setUsername(data?.data?.username);
          setEmail(data?.data?.email);
          setUserId(data?.data?.user_id);
          setFullname(data?.data?.fullname);
          setVerified(data?.data?.verified);
          setProfilePicture(data?.data?.profile_picture);
          setBio(data?.data?.bio);
          setID(data?.data?.id);
          setfollowing(data?.data?.following_count);
          setfollower(data?.data?.follower_count);
        }
        if (isError) {
          console.log("Not founed s");
        }
      } catch (error) {
        console.log("Error:", "error");
        // Handle the error here
      }
    };
    upDateData();

    return () => upDateData();
  }, [data]);

  // memoize the values
  const memoizedValue = useMemo(
    () => ({
      username,
      email,
      fullname,
      id,
      userID,
      verified,
      profilePicture,
      bio,
      following,
      follower,
    }),
    [username]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
