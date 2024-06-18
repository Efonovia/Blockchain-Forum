 

import React, { useState } from "react";
import useAuth from "../../context/userAuth/useAuth";
import axios from "axios";

export default function CommentsForm({info}) {
  const {id} = useAuth();
  axios.defaults.withCredentials = true;

  const [postText, setPostText] = useState("");
  const [datas, setData] = useState("Post Comment");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = stripHtmlTags(postText);
    setData('Posting...')
    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_BLOG_USER}/comment-blog-post`, {
          user_id: id,
          comments: result,  
          blog_id: info,
        })
        .then(async (result) => {
          
            window.location.reload(true)
 
        });
    } catch (err) {
      // console.log(err);
    }
  };

  function stripHtmlTags(html) {
    // Remove HTML tags using regex
    return html.replace(/<[^>]*>?/gm, "");
  }

  const maxLength = 500;

  function handleChange(event) {
    const newTexture = event.target.value;
    if (newTexture?.length <= maxLength) {
        setPostText(newTexture);
    }
  }

 

  return (
    <div className="p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="border-4 p-2 border-blue-400 rounded"
      >
        <div className="text-2xl font-bold text-black border-b-2 mb-4">
         Post Comment
        </div>
       
        <textarea
          name="posts"
          value={postText}
          required
          onChange={handleChange}
          className="resize-none  border rounded px-2 border-blue-100 w-full h-32"
          rows="4"
          cols="30"
          placeholder="Write your comments"
          maxLength={maxLength}
        />

<span className="flex justify-end right text-gray-500 text-xs">{postText.length}/{maxLength}</span>
       <button
          className="w-full rounded bg-blue-600 mt-3 py-3 text-white"
          type="submit"
        >
          {datas}
        </button>
      </form>
    </div>
  );
}
