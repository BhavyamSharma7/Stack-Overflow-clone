import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {askQuestion} from "../../actions/question";

import './AskQuestion.css';

function AskQuestion() {

    const User = useSelector((state) => (state.currentUserReducer));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [questionTags, setQuestionTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate));
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            setQuestionBody( questionBody + '\n' );
        }
    }

    return (
        <div className="ask-questions">
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking question to another person</p>
                            <input onChange={(e)=>{setQuestionTitle(e.target.value)}} type="text" id="ask-ques-title" placeholder="e.g. Is there an R function for finding index of an element in a vector?" required/>
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea onKeyPress={handleEnter} onChange={(e)=>{setQuestionBody(e.target.value)}} id="ask-ques-body" cols="30" rows="10" required></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add upto 5 tags to describe your question</p>
                            <input onChange={(e) => { setQuestionTags(e.target.value.split(" ")) }} onKeyDown={(e) => { if (e.target.value.split(" ").length > 5 && e.keyCode !== 8) { alert("youcannot add more than 5 tags!!"); e.target.value = e.target.value.substring(0, e.target.value.length-2); }}} type="text" id="ask-ques-tags" placeholder="e.g. (xml, typescript, wordpress)" />
                        </label>
                    </div>
                    <input type="submit" className="review-btn" value="Review your Question" />
                </form>
            </div>
        </div>
    );
}

export default AskQuestion;