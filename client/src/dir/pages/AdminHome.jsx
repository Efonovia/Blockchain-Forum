import React, { Fragment } from "react";
import "../../chat.css"
import AdminNav from "../components/reusable/AdminNav";
import BottomNav from "../components/reusable/BottomNav";


export default function AdminHome() {

    

  return (
    <Fragment>
      <div className="w-full bg-inherit mb-12 md:mb-0">
        <AdminNav classColor="bg py-2" />
        </div>

        <div id="frame">
            <div id="sidepanel">
                <div id="profile">
                    <div class="wrap">
                        <p>All Complaints</p>
                    </div>
                </div>
                <div id="contacts">
                    <ul>
                        <li class="contact">
                            <div class="wrap">
                                <span class="contact-status online"></span>
                                <h2 class="meta">A Complaint</h2>
                                <hr/>
                            </div>
                        </li>
                        <li class="contact active">
                            <div class="wrap">
                                <span class="contact-status online"></span>
                                <h2 class="meta">A Complaint</h2>
                                <hr/>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="contact-status online"></span>
                                <h2 class="meta">A Complaint</h2>
                                <hr/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content">
                <div class="contact-profile">
                    <h1 style={{fontWeight: 700, textAlign: "center", fontSize: "24px"}}>Title of Complaint</h1>
                </div>
                <div class="messages">
                    <ul>
                        <li class="replies">
                            <span style={{float: "left", fontWeight: 800, marginRight: "15px"}}>USER</span>
                            <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
                        </li>
                        <li class="sent">
                            <span>YOU</span>
                            <p>When you're backed against the wall, break the god damn thing down.</p>
                        </li>
                        <li class="replies">
                            <span style={{float: "left", fontWeight: 800, marginRight: "15px"}}>USER</span>
                            <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
                        </li>
                        <li class="sent">
                            <span>YOU</span>
                            <p>When you're backed against the wall, break the god damn thing down.</p>
                        </li>
                    </ul>
                </div>
                <div class="message-input">
                    <div class="wrap">
                    <input type="text" placeholder="Write your message..." />
                    <button class="submit">SEND</button>
                    </div>
                </div>
            </div>
        </div>
      <BottomNav />
    </Fragment>
  );
}
