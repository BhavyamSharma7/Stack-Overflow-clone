import React from "react";
import moment from "moment";
import { deleteAnswer } from "../../actions/question";
import Avatar from "../../components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function DisplayAnswers({ question, handleShare }) {
    
    const User = useSelector((state) => (state.currentUserReducer));
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    }

    return (
        <div>
            {
                question.answer.map(ans => (
                    
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="ques-action-user">
                            <div>
                                <button onClick={handleShare} className="edit-ques-btn">Share</button>
                                {
                                    User?.result?._id === ans?.userId &&
                                    <button className="edit-ques-btn" onClick={ ()=>{ handleDelete(ans._id, question.noOfAnswers) } }>Delete</button>
                                }
                            </div>
                            <div>
                                <p>Answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/User/${ans.userId}`} className="user-link" style={{ textDecoration: "none", color: "#00868d" }}>
                                    <Avatar backgroundColor="green" px="8px" py="5px" color="white">
                                        {ans.userAnswered.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div style={{fontSize: "15px", fontWeight: "bold"}}>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default DisplayAnswers;