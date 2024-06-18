import React, { useState } from "react";
import useAuth from "../../context/userAuth/useAuth";
import axios from "axios";

export const Bio = () => {
  axios.defaults.withCredentials = true;
  const { id } = useAuth();

  const [postText, setPostText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = stripHtmlTags(postText);

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_USER}/update-bio`, {
          id: id,
          bio: result,
        })
        .then(async (result) => {
          if (result.status === 200) {
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

  function stripHtmlTags(html) {
    // Remove HTML tags using regex
    return html.replace(/<[^>]*>?/gm, "");
  }

  const maxLength = 500;

  function handleChange(event) {
    const newTexture = event.target.value;
    if (newTexture.length <= maxLength) {
      setPostText(newTexture);
    }
  }

  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="border-4 p-2 border-blue-400 rounded"
      >
        {error && (
          <span className="text-center text-red-600 bold">{status}</span>
        )}
        {success && (
          <span className="text-center text-xl text-green-600 bold">
            {status}
          </span>
        )}
        <textarea
          name="posts"
          value={postText}
          onChange={handleChange}
          required
          className="resize-none  border rounded px-2 border-blue-100 w-full h-48"
          rows="4"
          cols="50"
          placeholder="Write a short note about yourself?"
          maxLength={maxLength}
        />

        <span className="flex justify-end right text-gray-500 text-xs">
          {postText.length}/{maxLength}
        </span>
        <button
          className="w-full rounded bg-green-600 mt-3 py-3 text-white"
          type="submit"
        >
          Update Bio
        </button>
      </form>
    </div>
  );
};
