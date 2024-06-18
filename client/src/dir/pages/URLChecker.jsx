import React, { Fragment } from "react";
import AsideUser from "../components/reusable/AsideUser";
import TopNav from "../components/reusable/TopNav";
import BottomNav from "../components/reusable/BottomNav";
import axios from "axios";
import useAuth from "../context/userAuth/useAuth";

const resultTypes = {
    "malicious": "red",
    "suspicious": "orange",
    "harmless": "green",
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-apikey': '0d841600e9c2826af8f43a9d908611dd5d4f506cbcbd5a5d11d505caead6db4f'
    }
  };
  
  

function getResult(obj) {
    if(obj) {
        const { malicious, suspicious, harmless } = obj
        return Object.keys(obj).find(key => obj[key] === Math.max(malicious, suspicious, harmless))
    } else {
        return "harmless"
    }
}

function base64UrlEncode(str) {
    let base64String = btoa(unescape(encodeURIComponent(str)))
    let urlSafeBase64 = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    console.log("base64dtrsinnh", urlSafeBase64)
    return urlSafeBase64;
}

export default function URLChecker() {
  axios.defaults.withCredentials = true;

    const [url, setUrl] = React.useState("")
    const [result, setResult] = React.useState("")
    const [loading, setLoading] = React.useState(false)
  const { username } = useAuth();

  function handleChange(e) {
    setUrl(e.target.value)
  }

  function handleSubmit() {
    if(loading || url.length < 1) return
    setLoading(true)
    fetch(`https://www.virustotal.com/api/v3/urls/${base64UrlEncode(url)}`, options)
    .then(response => response.json())
    .then(response => {
        if(response.error) {
            setLoading(false)
            return alert("an error occured. your url was either not found or you can try again")
        }
        console.log(response)
        setResult(getResult(response?.data?.attributes?.last_analysis_stats))
        setLoading(false)
    })
    .catch(err => {
        console.error(err)
    });
  }

  return (
    <Fragment>
      <div className="w-full bg-inherit mb-12 md:mb-0">
        <TopNav classColor="bg py-2" />


        <div className="w-full flex-wrap md:flex relative">
          {username ? (
            <aside className="hidden md:inline-block w-[5%] ">
              <AsideUser />
            </aside>
          ) : null}

          <section className="flex-1 md:w-[60%]  h-full">
            {username ? <div className="p-4 w-full">
                    <form
                        className="border-4 p-2 border-blue-900/50 rounded"
                    >
                        <div className="text-2xl font-bold text-black border-b-2 mb-4">
                        Check if a URL is legit or not
                        </div>

                        <input
                        name="url"
                        value={url}
                        onChange={handleChange}
                        className="resize-none  border rounded px-2 border-blue-100 w-full h-20"
                        placeholder="paste url"
                        />

                        <button
                        className="w-full rounded bg-[#090abb] mt-3 py-3 text-white"
                        onClick={handleSubmit}
                        type="button"
                        style={{cursor: loading ? "not-allowed": "pointer"}}
                        >
                        {loading ?"Processing ..." : "Check URL"}
                        </button>
                    </form>
                </div> : null
            }
          </section>
        </div>
        {result && <h1 style={{textAlign: "center", fontSize: 48}}>That URL is <span style={{fontWeight: 900, color: resultTypes[result] }}>{result.toLocaleUpperCase()}</span></h1>}      </div>
      <BottomNav />
    </Fragment>
  );
}
