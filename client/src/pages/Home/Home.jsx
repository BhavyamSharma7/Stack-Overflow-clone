import React from "react";
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import HomeMainBar from '../../components/HomeMainBar/HomeMainBar';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

import '../../App.css';

const Home = () => {
    
    const steps = [
        {
          id:'Greet',
          message: 'Hello, Welcome to our website',
          trigger:'Ask Name'
        },
        {
          id:'Ask Name',
          message: 'Please enter your name',
          trigger:'waiting1'
        },
        {
          id:'waiting1',
          user: true,
          trigger:'Name'
        },
        {
          id:'Name',
          message: 'Hi {previousValue}, Please write your mobile number',
          trigger:'phone'
        },
        {
            id:'phone', 
            user:true, 
            validator: (value) => {
               if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value))
                 {
                   return true;
                 }
               else
                 {
                   return'Please enter a valid phone number!';
                 }
            },
            //user:true,
            trigger:'thanks'
        },
        {
            id:'thanks',
            message: 'Thank you for providing details. Please select your concern',
            trigger:'issues'
        },
        {
          id:'issues',
          options: [
            {value: "React",label:"React",trigger:"React"},
            {value: "Angular",label:"Angular",trigger:"Angular"},
            {value: "Programming Language",label:"Programming Language",trigger:"prog"},
            {value: "How to ask question ?",label:"How to ask question ?",trigger:"ask"},
            {value: "How to post an answer ?",label:"How to ask an answer?",trigger:"post"},
            {value: "Popular Languages",label:"Popular Languages",trigger:"popular"},
          ],
        },
        {
          id:'React',
          message:'Thanks for telling your react issue, Visit tags section to resolve your issues.',
          end:true
        },
        {
          id:'Angular',
          message:'Thanks for telling your angular issue,  Visit tags section to resolve your issues.',
          end:true
        },
        {
            id:'prog',
            message:'Thanks for telling your issue,  Visit tags section to resolve your issues.',
            end:true
          },
          {
            id:'ask',
            message:'Thanks for telling your issue, Login or signup to website and click on ask question button. Write your questions there.',
            end:true
          },
          {
            id:'post',
            message:'Thanks for telling your issue, Login or signup to website. Click on the question you wish to answer. Click on post answer. Post your answer there.',
            end:true
          },
          {
            id:'popular',
            message:'Thanks for telling your issue,  Visit tags section to resolve your issues.',
            end:true
          },
      ];
  
  
      const theme={
        background:'#8bc6ff',
        headerBgColor:'#157dc7',
        haederFontSize:'20px',
        botBubbleColor:'#8f00ff',
        headerFontColor:'white',
        botFontColor:'white',
        userBubbleColor:'#00bbff',
        userFontColor:'white',
      };
  
      const config={
        floating:true
      }

    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2">
                <HomeMainBar />
                <RightSideBar />
            </div>
            <div>
                <ThemeProvider theme={theme}>
                    <ChatBot headerTitle="Stack-Bot" steps={steps}{...config} />
                </ThemeProvider>
            </div>
        </div>
    );
}

export default Home;