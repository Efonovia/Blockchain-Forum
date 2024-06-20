import React, { Fragment } from "react";
import "../../chat.css"
import AdminNav from "../components/reusable/AdminNav";
import BottomNav from "../components/reusable/BottomNav";
import { useMutation, useQuery } from 'react-query';
import "../../chat.css"
import { CircularProgress } from "@mui/material";
import { complaintGetRequest, complaintPostRequest } from "../../hooks";



export default function AdminHome() {
    const [selectedComplaint, setSelectedComplaint] = React.useState("")
    const [newMessage, setNewMessage] = React.useState("")
    const getComplaintsQuery = useQuery("get users complaints", () => complaintGetRequest({ route: `all` }))
  
    const complaintMessagesMutation = useMutation(complaintPostRequest, {
      onSuccess: data => {
          console.log(data)
          if(!data.ok) {
              alert(data.error)
          }
      },
      onError: () => alert("Network error. try again"),
      onSettled: getComplaintsQuery.refetch
    })

    function selectAComplaint(id) {
        setSelectedComplaint(id)

        const messageIds = getComplaintsQuery.data?.body?.find(complaint => complaint.id === id)?.messages?.map(msg => {
            if(!msg.seen && msg.sender === "user") {
                return msg.id
            }
        })

        const data = { messageIds }
        complaintMessagesMutation.mutate({ postDetails: data, route: `${id}/updateMessages` })
    }
  
      if(getComplaintsQuery.isLoading) {
          return <CircularProgress sx={{margin: "200px 500px", color: "blue"}} size={100}/>
      }
  
      if(getComplaintsQuery.isError) {
          return alert("You seem to have some network issues. please refresh and try again")
      }
  
      const complaintListHTML = [...getComplaintsQuery.data?.body?.sort((a,b) => new Date(a.createdAt)-new Date(b.createdAt))].map(complaint => {
          return <li key={complaint.id} onClick={() => selectAComplaint(complaint.id)} className={`contact ${complaint.id === selectedComplaint && "active"}`}>
                      <div className="wrap">
                          {complaint.unseen > 0 && <span className="contact-status online">{complaint.unseen}</span>}
                          <h2 className="meta">{complaint.title}</h2>
                          <hr/>
                      </div>
                  </li>
      })
  
      const messagesHTML = getComplaintsQuery.data?.body?.find(complaint => complaint.id === selectedComplaint)?.messages?.map(message => {
          if(message.sender === "admin") {
              return <li key={message.id} className="sent">
                          <span style={{color: "blue"}}>YOU</span>
                          <p style={{background: "blue"}}>{message.messageContent}</p>
                      </li>
          }
  
          return <li key={message.id} className="replies">
                      <span style={{float: "left", fontWeight: 800, marginRight: "15px"}}>USER</span>
                      <p>{message.messageContent}</p>
                  </li>
      })
  
  
      function sendMessage() {
          if(newMessage.length < 1) return
  
          const formData = {
              sender: "admin",
              messageContent: newMessage
          }
  
          setNewMessage("")
          complaintMessagesMutation.mutate({ postDetails: formData, route: `${selectedComplaint}/addMessage` })
          console.log(formData)
      }
    

  return (
    <Fragment>
      <div className="w-full bg-inherit mb-12 md:mb-0">
        <AdminNav classColor="bg py-2" />
        </div>

        <div id="frame">
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <p style={{fontWeight: 800, fontSize: 24}}>All Complaints</p>
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
                </> : <h1 className="h1-def">Select a complaint to view it's details</h1>}
            </div>
        </div>
      <BottomNav />
    </Fragment>
  );
}
