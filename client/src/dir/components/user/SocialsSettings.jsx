import React, { Fragment,useState, useEffect , useReducer } from "react";
  import {
  settingUpdateReducer,
  INITIAL_STATE,
} from "../../context/settingUpdateReducer/settingUpdateReducer";
import useAuth from "../../context/userAuth/useAuth";
import { AiTwotoneEdit, AiFillEye } from "react-icons/ai";
import { useQuery } from "react-query";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import Cookies from 'js-cookie';

export default function SocialsSettings() {
  const [state, dispatch] = useReducer(settingUpdateReducer, INITIAL_STATE);
  axios.defaults.withCredentials = true;
  const { permission, id: user_id } = useAuth();

  const avatar = () => {
    dispatch({ type: "AVATAR", payload: state.avatar });
  };
  const socials = () => {
    dispatch({ type: "SOCIALS", payload: state.socials });
  };

  const bio = () => {
    dispatch({ type: "BIO", payload: state.bio });
  };

  const password = () => {
    dispatch({ type: "PASSWORD", payload: state.password });
  };

  const [errors, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(false);
  const [home_team, setHome] = useState("");
  const [away_team, setAway] = useState("");
  const [match_day, setDay] = useState("");
  const [match_time, setTime] = useState("");
  const [prediction, setPrediction] = useState("");
  const [league, setLeague] = useState("");
  const [postCount, setPostCount] = useState(0);


  const dataTwoAPI = `${
    import.meta.env.VITE_REACT_APP_USER
  }/user/tipsfluencer/${user_id}`;

  const {
    isLoading: loadingAllUsers,
    error: errorAllUsers,
    data: dataTip,
  } = useQuery(["get-my-tip-one"], () =>
    axios.get(dataTwoAPI).then((res) => res.data)
  );




  useEffect(() => {
    const count = Cookies.get('notifications');
    if (count) {
      setPostCount(parseInt(count));
    }
  }, []);


 

   

  const postTips = async (e) => {
    e.preventDefault();

    if (postCount === 2) return alert('You have already made two posts today.');

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/user/tipsfluencer`, {
          home_team,
          away_team,
          match_day,
          league,
          match_time,
          prediction,
          user_id,
        })
        .then(async (result) => {
          if (result.status === 200) {
            setPostCount(postCount + 1);
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      Cookies.set('notifications', postCount + 1, { expires: endOfDay });
            setSuccess(true);
            setStatus(result.data);
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          } else {
            setError(true);
            setStatus(result.data);
          }

          setTimeout(() => {
            setStatus("");
            setSuccess(false);
            setError(false);
          }, 5000);
        });
    } catch (err) {
      console.log("err", err);
    }
  };

 

  return (
    <Fragment>
      <div className="flex flex-wrap">
        <div className="w-1/4">
          <div className="py-3   block px-4  text-sm capitalize text-gray-700 ">
            <span className="md:pl-3 font-bold md:text-xl ">Post Tips</span>
          </div>
        </div>
        <div className=" w-3/4">
          <div className="py-3   ml-6 rounded-md cursor-pointer text-sm md:text-base font-light">
            {status}
            Tipfluencer's Post <span className="pl-8"></span>{" "}
            <button onClick={socials} className="rounded-lg text-xs ">
              {" "}
              <AiTwotoneEdit className="blue text-sm md:text-xl" />
            </button>
          </div>
          <div
            className={
              state.socials ? "inline-block mb-8 md:mb-4  " : "hidden animate"
            }
          >
            {permission ? (
              <form onSubmit={postTips}>
                {errors && (
                  <span className="text-red-400">
                    {" "}
                    Cannot post now. Please contact support
                  </span>
                )}
                <div className="space-y-3 w-full flex-wrap md:flex justify-between items-center">
                  <div className="w-full md:w-1/3 flex md:pt-3">
                    <input
                      type="text"
                      onChange={(e) => {
                        setHome(e.target.value);
                      }}
                      maxLength={30}
                      className="border shadow-lg p-2 font-light rounded-lg pl-6 w-48   text-sm  italic"
                      placeholder="Home Team"
                    />
                  </div>
                  <div className="w-full md:w-1/3 flex">
                    <input
                      type="text"
                      onChange={(e) => {
                        setAway(e.target.value);
                      }}
                      className="border shadow-lg p-2 font-light rounded-lg pl-6 w-48   text-sm  italic"
                      placeholder="Away Team"
                    />
                  </div>
                  <div className="w-full md:w-1/3 flex">
                    <input
                      type="text"
                      onChange={(e) => {
                        setLeague(e.target.value);
                      }}
                      className="border shadow-lg p-2 font-light rounded-lg pl-6 w-48   text-sm  italic"
                      placeholder="League"
                    />
                  </div>
                  <div className="w-full md:w-1/3 flex">
                    <input
                      type="text"
                      onChange={(e) => {
                        setPrediction(e.target.value);
                      }}
                      className="border shadow-lg p-2 font-light rounded-lg pl-6 w-48   text-sm  italic"
                      placeholder="Prediction eg. 2 - 0"
                    />
                  </div>
                  <div className="w-full md:w-1/3 flex">
                    <input
                      type="time"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                      className=" border shadow-lg p-2 font-light rounded-lg pl-6 w-48  text-sm  italic"
                    />
                  </div>
                  <div className="w-full md:w-1/3 flex">
                    <input
                      type="date"
                      onChange={(e) => {
                        setDay(e.target.value);
                      }}
                      className=" border shadow-lg p-2 font-light rounded-lg pl-6 w-48  text-sm  italic"
                    />
                  </div>
                </div>

                <div className="-mx-4 md:mx-0 w-full md:w-2/3 mt-6 flex justify-center items-center">
                  <button
                    type="submit"
                    className="w-48 md:w-96 flex justify-center bg-green-500 p-2 rounded-lg px-6 ml-6 text-white mt-4 md:mt-0"
                    name="UpdateEmail"
                  >
                    Post Tips
                  </button>
                </div>
              </form>
            ) : (
              "No data"
            )}
          </div>
        </div>

        <div className="w-1/4">
          <div className="py-3   block px-4  text-sm capitalize text-gray-700 ">
            <span className="md:pl-3 font-bold md:text-xl ">My Tips</span>
          </div>
        </div>
        <div className=" w-3/4">
          <div className="py-3   ml-6 rounded-md cursor-pointer text-sm md:text-base font-light">
            View Posts <span className="pl-8"></span>{" "}
            <button onClick={bio} className="rounded-lg text-xs ">
              {" "}
              <AiFillEye className="blue text-sm md:text-xl" />
            </button>
          </div>
    
        </div>
        {permission ? 
        <div
            className={
              state.bio ? "inline-block mb-8 md:mb-4 w-full " : "hidden animate"
            }
          >
            <div className="w-full h-full flex-wrap ">
              <div className="flex">
                <table className="w-full text-sm text-left text-black overflow-hidden  ">
                  <thead className="text-xs  uppercase bg-blue text-white ">
                    <tr className=" border-blue-600">
                      <th scope="col" className="px-1 md:px-6 py-3">
                        Match
                      </th>
                      <th scope="col" className="px-1 md:px-6 py-3">
                        Tip
                      </th>
                      <th scope="col" className="px-1 md:px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {dataTip ? (
                      dataTip.map((datasa) => (
                        <tr
                          key={datasa.id}
                          className="bg-white border-b  dark:bg-blue-200/30 dark:border-blue-500 dark: text-black"
                        >
                          <th
                            scope="row"
                            className="max-w-xs capitalize px-1 flex-wrap font-light md:px-6 py-4  text-gray-900 whitespace-normal md:whitespace-nowrap  "
                          >
                            {datasa.home_team}{" "}
                            <span className="lowercase px-2 font-bold">
                              {" "}
                              vs
                            </span>{" "}
                            {datasa.away_team}
                          </th>
                          <td className="px-1 md:px-6 py-4 uppercase">
                            {datasa.prediction}
                          </td>

                          <td className="px-1 md:px-6 py-4">
                            {datasa.result === "loss" ? (
                              <MdCancel className="text-red-500 text-xl md:text-3xl" />
                            ) : datasa.result === "won" ? (
                              <BsCheckCircleFill className="text-green-500 text-xl md:text-2xl" />
                            ) : null}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white border-b  dark:bg-blue-200/30 dark:border-blue-500 dark: text-black">
                        <td colSpan={4}>
                          Unable to fetch data. Refresh this page.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
            </div>
          </div>
  : 'No Post' }
 
      </div>
    </Fragment>
  );
}
