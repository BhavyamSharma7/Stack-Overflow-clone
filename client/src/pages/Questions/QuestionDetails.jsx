import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import copy from "copy-to-clipboard";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswers from "./DisplayAnswers";
import { postAnswer, deleteQuestion, voteQuestion } from "../../actions/question";

import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";

import "./Questions.css";

function QuestionDetails() {

    const { id } = useParams();
    const [Answer, setAnswer] = useState('');
    const questionsList = useSelector((state) => (state.questionsReducer));

    // const questionsList = [
    //     {
    //         _id: '1',
    //         upVotes: 3,
    //         downVotes: 2,
    //         noOfAnswers: 1,
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
    //         _id: '2',
    //         upVotes: 3,
    //         downVotes: 2,
    //         noOfAnswers: 1,
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
    //         _id: '3',
    //         upVotes: 1,
    //         downVotes: 0,
    //         noOfAnswers: 1,
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
    
    const User = useSelector((state) => (state.currentUserReducer));
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            alert("Login or signup to answer a question!!");
            navigate("/Auth");
        } else {
            if (Answer === '') {
                alert("Enter an answer before submitting!!");
            } else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength+1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id }));
            }
        }
    }

    const handleShare = () => {
        const url = "http://localhost:3000";
        copy(url + location.pathname);
        alert("Url copied!!\nUse this to share the page.\n" + url + location.pathname);
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate));
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, "upVote", User.result._id));   
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, "downVote", User.result._id));   
    }

    return (
        <div className="ques-details-page">
            {
                questionsList.data === null ? <h1>Loading...</h1> :
                    questionsList.data.filter(question => question._id === id).map(question => (
                    <div key={question._id}>
                        <section className="ques-details-container">
                                <h1>{question.questionTitle}</h1>
                                <div className="ques-details-container-2">
                                    <div className="ques-votes">
                                        <img onClick={handleUpVote} src={upvote} alt="upvote" width="18" className="votes-icon"/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img onClick={handleDownVote} src={downvote} alt="downvote" width="18" className="votes-icon"/>
                                    </div>
                                    <div style={{width: "100%"}}>
                                        <p className="ques-body">{question.questionBody}</p>
                                        <div className="ques-details-tags">
                                            {question.questionTags.map(tag => (
                                                <p key={tag}>{tag}</p>
                                            ))}
                                        </div>
                                        <div className="ques-action-user">
                                            <div>
                                                <button onClick={handleShare} className="edit-ques-btn">Share</button>
                                                {
                                                    User?.result?._id === question?.userId &&
                                                    <button className="edit-ques-btn" onClick={ handleDelete }>Delete</button>
                                                }
                                            </div>
                                            <div>
                                                <p>Asked {moment(question.askedOn).fromNow()}</p>
                                                <Link to={`/User/${question.userId}`} className="user-link" style={{ textDecoration: "none", color: "#00868d" }}>
                                                    <Avatar backgroundColor="orange" px="8px" py="5px" color="white">
                                                        {question.userPosted.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <div style={{fontSize: "15px", fontWeight: "bold"}}>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers !== 0 && (
                                <section>
                                        {question.noOfAnswers === 1 ? <h3>{question.noOfAnswers} Answer</h3> :
                                        <h3>{question.noOfAnswers} Answers</h3>}
                                        <DisplayAnswers key={question._id} question={question} handleShare={handleShare} />
                                </section>
                            )}
                            <section className="post-ans-container">
                                <h3>Your Answer</h3>
                                <form onSubmit={(e)=>{ handlePostAns(e, question.answer.length) }}>
                                    <textarea className="ans-inp" cols="30" rows="10" onChange={(e)=>{setAnswer(e.target.value)}}></textarea> <br />
                                    <input type="submit" className="post-ans-btn" value="Post your answer" />
                                </form>
                                <p>Browse other Questions tagged <br /><br />
                                    {
                                        question.questionTags.map(tag => (
                                            <Link to="/Tags" className="ans-tag" key={tag}> {tag} </Link>
                                        ))
                                    } <br /><br /> or 
                                    <Link to="/AskQuestion" style={{textDecoration: "none", color: "#009dff"}}> ask your own question.</Link>
                                </p>
                            </section>
                    </div>
                ))
            }
        </div>
    );
}

export default QuestionDetails;