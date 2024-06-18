import axios from "axios";
import useAuth from "../../context/userAuth/useAuth";

axios.defaults.withCredentials = true;


export const handleUnfollow = async (e) => {
    const {id} = useAuth()

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/unfollow/${e}`, {
          follower_id: await id,
        })
        .then(async (result) => {
          if (result.status === 200) {
            return;
          } else {
            return;
          }

           
        });
    } catch (err) {
      console.log(err);
    }
  };


  export const handleFollows = async (e) => {

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/follows/${e}`, {
          follower_id: await id,
        })
        .then(async (result) => {
          if (result.status === 200) {
            return;
          } else {
            return;
          }

           
        });
    } catch (err) {
      console.log(err);
    }
  };