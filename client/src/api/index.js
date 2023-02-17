import axios from "axios";

const API = axios.create({ baseURL: "https://stackoverflow-api-ubav.onrender.com" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
    }
    
    return req;
});

export const login = (authData) => API.post("/user/login", authData);
export const signup = (authData) => API.post("/user/signup", authData);
export const fetchAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData); 

export const postQuestion = (questionData) => API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (_id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answers/post/${_id}`, { noOfAnswers, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answers/delete/${id}`, { answerId, noOfAnswers });