import React, { Fragment, useReducer, useState } from "react";
import {
  settingUpdateReducer,
  INITIAL_STATE,
} from "../../context/settingUpdateReducer/settingUpdateReducer";
import { Bio } from "./Bio";
import useAuth from "../../context/userAuth/useAuth";
import axios from "axios";
import { AiTwotoneEdit } from "react-icons/ai"; 

export default function   Settings() {
  axios.defaults.withCredentials = true;
  const [state, dispatch] = useReducer(settingUpdateReducer, INITIAL_STATE);
  const { id, username, fullname, verified, kmpPoint } = useAuth();

  const avatar = () => {
    dispatch({ type: "AVATAR", payload: state.avatar });
  };
  const socials = () => {
    dispatch({ type: "SOCIALS", payload: state.socials });
  };

  const fullnames = () => {
    dispatch({ type: "FULLNAME", payload: state.fullname });
  };

  const bio = () => {
    dispatch({ type: "BIO", payload: state.bio });
  };

  const password = () => {
    dispatch({ type: "PASSWORD", payload: state.password });
  };



  const [status, setStatus] = useState('')
  const [newFullname, setnewFullname] = useState('')
  const [successFullname, setSuccessFullname] = useState(false)
  const [errorFullname, setErrorFullname] = useState(false)
  const updateFullname = async (e) => {
  
    e.preventDefault();
  
    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/update-fullname`, {
          id: id,
          fullname: newFullname,
        })
        .then(async (result) => {
          if (result.status === 200) {
            setSuccessFullname(true);
            setStatus(result.data);
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          } else {
            setErrorFullname(true);
            setStatus(result.data);
          }
  
          setTimeout(() => {
            setStatus("");
            setSuccessFullname(false);
            setErrorFullname(false);
          }, 5000);
        });
    } catch (err) {
      console.log('err', err);
    }
  };



  const [newTwitter, setnewTwitter] = useState('')
  const [successTwitter, setSuccessTwitter] = useState(false)
  const [errorTwitter, setErrorTwitter] = useState(false)
  
  const updateTwitter = async (e) => {
    e.preventDefault();
  
    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/update-twitter`, {
          id: id,
          twitter: newTwitter,
        })
        .then(async (result) => {
          if (result.status === 200) {
            setSuccessTwitter(true);
            setStatus(result.data);
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          } else {
            setErrorTwitter(true);
            setStatus(result.data);
          }
  
          setTimeout(() => {
            setStatus("");
            setSuccessTwitter(false);
            setErrorTwitter(false);
          }, 5000);
        });
    } catch (err) {
      console.log('err', err);
    }
  };



  const [newInstagram, setnewInstagram] = useState('')
const [successInstagram, setSuccessInstagram] = useState(false)
const [errorInstagram, setErrorInstagram] = useState(false)


const updateInstagram = async (e) => {
  e.preventDefault();

  try {
    await axios
      .post(`${import.meta.env.VITE_REACT_APP_USER}/update-instagram`, {
        id: id,
        instagram: newInstagram,
      })
      .then(async (result) => {
        if (result.status === 200) {
          setSuccessInstagram(true);
          setStatus(result.data);
          setTimeout(() => {
            window.location.reload(true);
          }, 3000);
        } else {
          setErrorInstagram(true);
          setStatus(result.data);
        }

        setTimeout(() => {
          setStatus("");
          setSuccessInstagram(false);
          setErrorInstagram(false);
        }, 5000);
      });
  } catch (err) {
    console.log('err', err);
  }
};


const [passwords, setPassword] = useState('')
const [passwordNew, setPasswordNew] = useState('')
const [successPassword, setSuccessPassword ] = useState(false)
const [errorPassword, setErrorPassword] = useState(false)


const updatePassword = async (e) => {
  e.preventDefault();

  if(passwords !== passwordNew){
    setErrorPassword(true);
    setStatus('Passwords do not match');
    return false;
  }
  try {
    await axios
      .post(`${import.meta.env.VITE_REACT_APP_USER}/update-password`, {
        id: id,
        password: passwords,
      })
      .then(async (result) => {
        if (result.status === 200) {
          setSuccessPassword(true);
          setStatus(result.data);
          setTimeout(() => {
            window.location.reload(true);
          }, 3000);
        } else {
          setErrorPassword(true);
          setStatus(result.data);
        }

        setTimeout(() => {
          setStatus("");
          setSuccessPassword(false);
          setErrorPassword(false);
        }, 5000);
      });
  } catch (err) {
    console.log('err', err);
  }

  setTimeout(() => {
    setStatus("");
    setSuccessPassword(false);
    setErrorPassword(false);
  }, 5000);
};

const [myavatar, setAvatar ] = useState(null)
const [successAvatar , setSuccessAvatar  ] = useState(false)
const [errorAvatar , setErrorAvatar ] = useState(false)

const handleFileChange = (event) => {
  setAvatar(event.target.files[0]);
};

const updateAvatar  = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", myavatar);
  // formData.append("username", username);
 
  try {
    await axios
      .post(`${import.meta.env.VITE_REACT_APP_USER}/update-avatar/${username}`, formData)
      .then(async (result) => {
        if (result.status === 200) {
          setSuccessAvatar(true);
          setStatus(result.data);
          setTimeout(() => {
            window.location.reload(true);
          }, 3000);
        } else {
          setErrorAvatar(true);
          setStatus(result.data);
        }

        setTimeout(() => {
          setStatus("");
          setSuccessAvatar(false);
          setErrorAvatar(false);
        }, 5000);
      });
  } catch (err) {
    console.log('err', err);
  }

  setTimeout(() => {
    setStatus("");
    setSuccessAvatar(false);
    setErrorAvatar(false);
  }, 5000);
};


  return (
    <Fragment>
      <div className="flex flex-wrap">
        {fullname === null || fullname.length < 4 ? (
          <Fragment>
            <div className="w-1/4">
              <div className="py-3   md:mt-0 block px-4 text-sm capitalize text-gray-700 ">
                <span className="md:pl-3 font-bold md:text-xl ">Fullname</span>
              </div>
            </div>
            <div className="w-3/4">
              <div className="py-3  ml-6 cursor-pointer text-sm md:text-base font-light">
                Update Fullname <span className="pl-8"></span>{" "}
                <button
                  onClick={fullnames}
                  className="px-1"
                >
                  <AiTwotoneEdit className="blue text-sm md:text-xl" />
                </button>
              </div>
              <div
                className={state.fullname ? "inline-block" : "hidden animate"}
              >
                <div className="flex justify-center ">
                  {errorFullname && (
                    <span className="text-center text-red-600 bold">
                      {status}
                    </span>
                  )}
                  {successFullname && (
                    <span className="text-center text-xl text-green-600 bold">
                      {status}
                    </span>
                  )}
                </div>
                <form onSubmit={updateFullname}>
                  <input
                    type="text"
                    placeholder="Enter your fullname"
                    name="fullname"
                      onChange={(e) => setnewFullname(e.target.value)}
                      required
                    className="shadow-lg border p-2 font-light rounded-lg pl-6 w-48 md:w-72 text-sm  italic"
                  />
                  <button
                    type="submit"
                    className=" bg-green-500 p-2 rounded-lg px-6 ml-6 text-white mt-4 md:mt-0"
                  >
                    Update Fullname 
                  </button>
                </form>
              </div>
            </div>
          </Fragment>
        ) : null}


{/* avatar */}
        <div className="w-1/4">
          <div className="py-3 block px-4   text-sm capitalize text-gray-700 ">
            <span className="md:pl-3 font-bold  md:text-xl ">
            Profile Picture
            </span>
          </div>
        </div>
        <div className="w-3/4">
          <div className="py-3  md:mt-0 ml-6 cursor-pointer text-sm md:text-base font-light">
            Profile Picture <span className="pl-8"></span>
            <button onClick={avatar} id="avatar" className="px-1">
              {" "}
              <AiTwotoneEdit className="blue text-sm md:text-xl" />

            </button>
          </div>
          <div
            id="showAvatar"
            className={state.avatar ? "inline-block" : "hidden animate"}
          >

<div className="flex justify-center ">
                  {errorAvatar && (
                    <span className="text-center text-red-600 bold">
                      {status}
                    </span>
                  )}
                  {successAvatar && (
                    <span className="text-center text-xl text-green-600 bold">
                      {status}
                    </span>
                  )}
                </div>

            <form method="post"  encType="multipart/form-data" onSubmit={updateAvatar}>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="rounded-lg border p-1 border-blue-800/30"
              />
              <button
                type="submit"
                className=" bg-green-500 p-2 rounded-lg px-6  text-white mt-4 md:mt-0"
              >
                Update Profile Picture
              </button>
            </form>
          </div>
        </div>
{/* avatar */}


        {/* <div className="w-1/4">
          <div className="py-3  md:mt-0 block px-4   text-sm capitalize text-gray-700 ">
            <span className="md:pl-3 font-bold md:text-xl ">Socials</span>
          </div>
        </div>
        <div className=" w-3/4">
          <div className="py-3  md:mt-0 ml-6 rounded-md cursor-pointer text-sm md:text-base font-light">
            Change details<span className="pl-8"></span>{" "}
            <button onClick={socials} className="px-1">
              {" "}
              <AiTwotoneEdit className="blue text-sm md:text-xl" />

            </button>
          </div>
          <div
            className={
              state.socials
                ? "inline-block mb-8 md:mb-4 border-b md:border-0"
                : "hidden animate"
            }
          >

<div className="flex justify-center ">
                  {errorTwitter && (
                    <span className="text-center text-red-600 bold">
                      {status}
                    </span>
                  )}
                  {successTwitter && (
                    <span className="text-center text-xl text-green-600 bold">
                      {status}
                    </span>
                  )}
                </div>
            <form onSubmit={updateTwitter}>
              <input
                type="text"
                name="twitter"
                onChange={(e) => setnewTwitter(e.target.value)}
                required
                className="shadow-lg border p-2 font-light rounded-lg pl-6 w-48 md:w-72 text-sm  italic"
                placeholder="username only e.g username"
              />
              <button
                type="submit"
                className=" bg-blue-500 p-2 rounded-lg px-6 ml-6 text-white mt-4 md:mt-0"
                name="UpdateEmail"
              >
                Update Twitter
              </button>
            </form>
          </div>
          <div className={state.socials ? "inline-block" : "hidden animate"}>
          
          {errorInstagram && (
                    <span className="text-center text-red-600 bold">
                      {status}
                    </span>
                  )}
                  {successInstagram && (
                    <span className="text-center text-xl text-green-600 bold">
                      {status}
                    </span>
                  )}
                <form onSubmit={updateInstagram}>
              <input
                type="text"
                name="instagram"
                onChange={(e) => setnewInstagram(e.target.value)}
                required
                className="shadow-lg border p-2 font-light rounded-lg pl-6 w-48 md:w-72 text-sm  italic"
                placeholder="username only e.g username"
              />
              <button
                type="submit"
                className=" bg-gradient-to-r from-rose-400 to-orange-300 p-2 rounded-lg px-6 ml-6 text-white mt-4 md:mt-0"
              >
                Update Instagram
              </button>
            </form>
          </div>
        </div> */}


{/* password */}
        <div className="w-1/4">
          <div className="py-3   block px-4  text-sm capitalize text-gray-700 ">
            <span className="md:pl-3 font-bold md:text-xl ">Password</span>
          </div>
        </div>
        <div className="w-3/4">
          <div className="py-3  ml-6 cursor-pointer text-sm md:text-base font-light">
            Change Password <span className="pl-8"></span>{" "}
            <button onClick={password}  className="px-1">
            <AiTwotoneEdit className="blue text-sm md:text-xl" />

            </button>
          </div>
          <div
            className={state.password ? "inline-block" : "hidden animate"}
          >




<div className="flex justify-center ">
                  {errorPassword && (
                    <span className="text-center text-red-600 bold">
                      {status}
                    </span>
                  )}
                  {successPassword && (
                    <span className="text-center text-xl text-green-600 bold">
                      {status}
                    </span>
                  )}
                </div>
            <form onSubmit={updatePassword}>
              <input
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
              required  className="shadow-lg border p-2 font-light rounded-lg pl-6 w-48 md:w-72 text-sm  italic"
                placeholder="Enter New Password"
              />{" "}
              <br />
              <input
                type="Password"
                onChange={(e) => setPasswordNew(e.target.value)}
              required  className="shadow-lg border p-2 font-light rounded-lg pl-6 w-48 md:w-72 text-sm  italic"
                placeholder="Retype Password"
              />
              <button
                type="submit"
                className=" bg-green-500 p-2 rounded-lg px-6 mt-4 md:mt-0 ml-3 md:ml-6  text-white"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
{/* password */}



        <div className="w-1/4">
          <div className="py-3   block px-4 file: text-sm capitalize text-gray-700 ">
            <span className="md:pl-3 font-bold md:text-xl ">Bio</span>
          </div>
        </div>
        <div className="w-3/4">
          <div className="py-3   ml-6 cursor-pointer text-sm md:text-base font-light">
            Update bio<span className="pl-8"></span>{" "}
            <button onClick={bio}  className="px-1">
            <AiTwotoneEdit className="blue text-sm md:text-xl" />

            </button>
          </div>
          <div
            id="passOpen"
            className={state.bio ? "inline-block w-full" : "hidden animate"}
          >
            <Bio />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
