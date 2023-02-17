import mongoose from "mongoose";
import Questions from "../models/Questions.js";

// add an asnwer to specific question **************************************************

export const postAnswer = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, userAnswered, answerBody, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).json("Question unavialable!!");
    }else{
        updateNoOfAnswers(_id, noOfAnswers);
        try {
            const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { "answer": [{ answerBody, userAnswered, userId }] } })
            res.status(200).json(updatedQuestion);
        } catch (error) {
            console.log(error);
        }
    }
}

const updateNoOfAnswers = async(_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, {$set: { noOfAnswers: noOfAnswers }});
    } catch (error) {
        console.log(error.message);
    }
}



// deleting a specific answer from a question ***************************************

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(answerId)) {
        res.status(404).json("Question unavialable!!");
    } else {
        updateNoOfAnswers(_id, noOfAnswers);
        try {
            await Questions.updateOne(
                { _id },
                { $pull: { "answer": { _id: answerId } } }
            );
            res.status(200).json({ message: "answer deleted successfully!!" });
        } catch (error) {
            console.log(error);
        }
    }
}