import React, { useState } from "react";
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import HomeMainBar from '../../components/HomeMainBar/HomeMainBar';
import { BsChatSquare } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Chatbot from "../../components/Chatbot/Chatbot";

import '../../App.css';

const Home = () => {
    
    const [BotIsOpen, setBotIsOpen] = useState(false);

    return (
        <div className="home-container-1">
                  {BotIsOpen ? (
              <div className="chatbot-button" onClick={() => setBotIsOpen(false)}>
                <RxCross1 className="comment-button" />
              </div>
            ) : (
              <div className="chatbot-button" onClick={() => setBotIsOpen(true)}>
                <BsChatSquare className="comment-button" />
              </div>
            )}
            {BotIsOpen && <Chatbot setBotIsOpen={setBotIsOpen} />}
            <LeftSideBar />
            <div className="home-container-2">
                <HomeMainBar />
                <RightSideBar />
            </div>
        </div>
    );
}

export default Home;