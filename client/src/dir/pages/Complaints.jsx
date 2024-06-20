import React, { Fragment } from "react";
import AsideUser from "../components/reusable/AsideUser";
import TopNav from "../components/reusable/TopNav";
import BottomNav from "../components/reusable/BottomNav";
import useAuth from "../context/userAuth/useAuth";
import { useMutation, useQuery } from 'react-query';
import AddBox from '@mui/icons-material/AddBox';
import "../../chat.css"
import { CircularProgress } from "@mui/material";
import { complaintGetRequest, complaintPostRequest } from "../../hooks";
import { useParams } from "react-router-dom";
import FormDialog from "../components/FormDialog";


export default function Complaints() {
  const { username } = useAuth();
  const { userId } = useParams()
  const [open, setOpen] = React.useState(false);
  const [selectedComplaint, setSelectedComplaint] = React.useState("")
  const [newMessage, setNewMessage] = React.useState("")
  const getComplaintsQuery = useQuery("get users complaints", () => complaintGetRequest({ route: `user/${userId}` }))

  const sendMessageMutation = useMutation(complaintPostRequest, {
    onSuccess: data => {
        console.log(data)
        if(!data.ok) {
            alert(data.error)
        }
    },
    onError: () => alert("Network error. try again"),
    onSettled: getComplaintsQuery.refetch
  })

    if(getComplaintsQuery.isLoading) {
        return <CircularProgress sx={{margin: "200px 500px", color: "blue"}} size={100}/>
    }

    if(getComplaintsQuery.isError) {
        return alert("You seem to have some network issues. please refresh and try again")
    }

    const complaintListHTML = [...getComplaintsQuery.data?.body?.sort((a,b) => new Date(a.createdAt)-new Date(b.createdAt))].map(complaint => {
        return <li key={complaint.id} onClick={() => setSelectedComplaint(complaint.id)} className={`contact ${complaint.id === selectedComplaint && "active"}`}>
                    <div className="wrap">
                        {complaint.unseen > 0 && <span className="contact-status online">{complaint.unseen}</span>}
                        <h2 className="meta">{complaint.title}</h2>
                        <hr/>
                    </div>
                </li>
    })

    const messagesHTML = getComplaintsQuery.data?.body?.find(complaint => complaint.id === selectedComplaint)?.messages?.map(message => {
        if(message.sender === "user") {
            return <li key={message.id} className="sent">
                        <span style={{color: "blue"}}>YOU</span>
                        <p style={{background: "blue"}}>{message.messageContent}</p>
                    </li>
        }

        return <li key={message.id} className="replies">
                    <span style={{float: "left", fontWeight: 800, marginRight: "15px"}}>ADMIN</span>
                    <p>{message.messageContent}</p>
                </li>
    })

    const handleClickOpen = () => {
        setOpen(true)
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    function sendMessage() {
        if(newMessage.length < 1) return

        const formData = {
            sender: "user",
            messageContent: newMessage
        }

        setNewMessage("")
        sendMessageMutation.mutate({ postDetails: formData, route: `${selectedComplaint}/addMessage` })
        console.log(formData)
    }

  return (
    <Fragment>
        <FormDialog setSelectedComplaint={setSelectedComplaint} refetch={getComplaintsQuery.refetch} userId={userId} open={open} handleClose={handleClose}/>

      <div className="w-full bg-inherit mb-12 md:mb-0">
        <TopNav classColor="bg py-2" />


        <div className="w-full flex-wrap md:flex relative">
          {username ? (
            <aside className="hidden md:inline-block w-[5%] ">
              <AsideUser />
            </aside>
          ) : null}

        </div>
      </div>

        <div style={{ width: "90vw", float: "right" }} id="frame">
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <p style={{fontWeight: 800, fontSize: 24}}>YOUR COMPLAINTS</p>
                        <AddBox onClick={handleClickOpen} sx={{width: 30, height: 30, color: "white", cursor: "pointer"}}/>
                    </div>
                </div>
                <div id="contacts">
                    <ul>{complaintListHTML}</ul>
                </div>
            </div>
            <div className="content">
                {selectedComplaint ? <>
                    <div className="contact-profile">
                        <h1 style={{fontWeight: 700, textAlign: "center", fontSize: "24px"}}>{getComplaintsQuery.data?.body?.find(complaint => complaint.id === selectedComplaint)?.title}</h1>
                    </div>
                    <div className="messages">
                        <ul>{messagesHTML}</ul>
                    </div>
                    <div className="message-input">
                        <div className="wrap">
                        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} type="text" placeholder="Write your message..." />
                        <button onClick={sendMessage} className="button">SEND</button>
                        </div>
                    </div>
                </>: <h1 className="h1-def">Select a complaint to view it's details</h1>}
            </div>
        </div>

      <BottomNav />
    </Fragment>
  );
}
