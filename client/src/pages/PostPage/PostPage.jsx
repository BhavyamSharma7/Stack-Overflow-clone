import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./PostPage.css";

const PostPage = () => {
  const [currPost, setPost] = useState({});
  const PostsList = useSelector((state) => state.postReducer);
  const currPostId = useLocation().pathname.split("/")[3];
  // console.log(PostsList.data);
  useEffect(() => {
    setPost(PostsList.data.filter((p) => p._id === currPostId)[0]);
  }, [PostsList.data, currPostId]);

  if (!currPost) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="post-page">
        <div className="wrapper">
            <Post post={currPost && currPost} />
        </div>
      </div>
    );
  }
};

export default PostPage;