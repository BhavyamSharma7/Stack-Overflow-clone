import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    questionTitle: { type: String, required: "question must have a title" },
    questionBody: { type: String, required: "question must have a body" },
    questionTags: { type: [String], required: "question must have a tag" },
    noOfAnswers: { type: Number, default: 0 },
    upVote: { type: [String], default: [] },
    downVote: { type: [String], default: [] },
    userPosted: { type: String, required: "question must have a author" },
    userId: { type: String },
    askedOn: { type: Date, default: Date.now },
    answer: [{
        answerBody: String,
        userAnswered: String,
        userId: String,
        answeredOn: {type: Date, default: Date.now}
    }]
});

export default mongoose.model("Question", questionSchema);