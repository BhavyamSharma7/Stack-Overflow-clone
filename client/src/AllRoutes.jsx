import React from "react";
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DsiplayQuestions from "./pages/Questions/DisplayQuestions";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import Plans from "./pages/Plans/Plans";
import UserProfile from "./pages/UserProfile/UserProfile";
import CommunityHome from "./pages/Community/CommunityHome";
import PostPage from "./pages/PostPage/PostPage";

import { Routes, Route } from 'react-router-dom';

const AllRoutes = () => {
    
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/Auth" element={<Auth />} />
            <Route exact path="/Questions" element={<Questions />} />
            <Route exact path="/AskQuestion" element={<AskQuestion />} />
            <Route exact path="/Questions/:id" element={<DsiplayQuestions />} />
            <Route exact path="/Tags" element={<Tags />} />
            <Route exact path="/Users" element={<Users />} />
            <Route exact path="/plans" element={<Plans />} />
            <Route exact path="/Users/:id" element={<UserProfile />} />
            <Route exact path="/stack-community" element={<CommunityHome />} />
            <Route path="/stack-community/post/:id" element={<PostPage />} />
        </Routes>
    );
}

export default AllRoutes;