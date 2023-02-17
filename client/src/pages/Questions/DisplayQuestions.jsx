import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import QuestionDetails from "./QuestionDetails";

function DsiplayQuestions() {
    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2">
                <QuestionDetails/>
                <RightSideBar />
            </div>
        </div>
    );
}

export default DsiplayQuestions;