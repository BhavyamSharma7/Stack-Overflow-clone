import React from "react";

import pen from '../../assets/pen.svg';
import comment from '../../assets/comment-solid.svg';
import blogo from '../../assets/black-logo.svg';

const Widget = () => {
    
    return (
        <div className="widget">
            <h4>The Overflow blog</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <img src={pen} alt="pen" height="18" />
                    <p>Observability is the key to the future of<br/> software(and your DevOps career)</p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={pen} alt="pen" height="18" />
                    <p>Podcast 374: How valuable is your screen<br/> name?</p>
                </div>
            </div>
            <h4>Featured on Meta</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <img src={comment} alt="comment" height="18" />
                    <p>Review queue workflows - Final release...</p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={comment} alt="comment" height="18" />
                    <p>Please welcome Valued Associates: #958<br/> - V2Blast #959 - SpencerG</p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={blogo} alt="black-logo" height="18" />
                    <p>Outdaed Answers: accepted answer is<br/> now unpinned on Stack Overflow.</p>
                </div>
            </div>
            <h4>Hot Meta Posts</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <p>38</p>
                    <p>Why was this spam flag declined, yet<br/> the question marked as spam?</p>
                </div>
                <div className="right-sidebar-div-2">
                    <p>20</p>
                    <p>What is the course of action when<br/> the user has high enough rep to...</p>
                </div>
                <div className="right-sidebar-div-2">
                    <p>14</p>
                    <p>Is the link to "How to ask" help page a<br/> useful comment?</p>
                </div>
            </div>
        </div>
    );
}

export default Widget;