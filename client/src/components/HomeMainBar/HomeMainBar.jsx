import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Questions from "./Questions";

import './HomeMainBar.css';

const HomeMainBar = () => {
    const user = 12;
    const location = useLocation();
    const navigate = useNavigate();

    const questionsList = useSelector((state) => (state.questionsReducer));
    // console.log(questionsList);

    // const questionsList = [
    //     {
    //         _id: 1,
    //         upVotes: 3,
    //         downVotes: 2,
    //         noOfAnswers: 2,
    //         questionTitle: "what is a function?",
    //         questionBody: "It meant to be",
    //         questionTags: ["java", "nodejs", "python", "reactjs", "mongodb"],
    //         userPosted: "bhav",
    //         userId: 1,
    //         askedOn: "jan 1",
    //         answer: [{
    //             answerBody: "Answer",
    //             userAnswered: "bhav",
    //             answeredOn: "jan 2",
    //             userId: 2
    //         }]
    //     },{
    //         _id: 2,
    //         upVotes: 3,
    //         downVotes: 2,
    //         noOfAnswers: 0,
    //         questionTitle: "what is a function?",
    //         questionBody: "It meant to be",
    //         questionTags: ["javascript", "R", "python"],
    //         userPosted: "bhav",
    //         userId: 1,
    //         askedOn: "jan 1",
    //         answer: [{
    //             answerBody: "Answer",
    //             userAnswered: "bhav",
    //             answeredOn: "jan 2",
    //             userId: 2
    //         }]
    //     },{
    //         _id: 3,
    //         upVotes: 1,
    //         downVotes: 0,
    //         noOfAnswers: 0,
    //         questionTitle: "what is a function?",
    //         questionBody: "It meant to be",
    //         questionTags: ["javascript", "R", "python"],
    //         userPosted: "bhav",
    //         userId: 2,
    //         askedOn: "jan 1",
    //         answer: [{
    //             answerBody: "Answer",
    //             userAnswered: "bhav",
    //             answeredOn: "jan 2",
    //             userId: 3
    //         }]
    //     }
    // ]

    const checkAuth = () => {
        if (user === null) {
            alert("Login or signup to ask a question!");
            navigate('/Auth');
        } else {
            navigate('/AskQuestion');
        }
    }

    return (
        <div className="main-bar">
            <div className="main-bar-header">
                {location.pathname === "/" ? <h1>Top Questions</h1> : <h1>All Questions</h1>}
                <button onClick={checkAuth} className="ask-btn">
                    Ask Question
                </button>
            </div>
            <div>
                {questionsList.data === null ?
                    <h1>Loading...</h1> :
                    <div>
                        <p>{questionsList.data.length} questions</p>
                        {questionsList.data.map((question) => {
                            // console.log(question);
                            return <Questions question={question} key={question._id} />
                        })}
                    </div>
                }
            </div>
        </div>
    );
}

export default HomeMainBar;