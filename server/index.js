import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import questionRoutes from "./routes/question.js";
import answerRoutes from "./routes/answers.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is stack overflow clone api");
});


app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => { console.log(`Server is running at port ${port}`); }))
    .catch((err) => { console.log(err.message); });