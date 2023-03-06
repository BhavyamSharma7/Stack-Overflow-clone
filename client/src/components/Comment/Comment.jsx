import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../pages/PostPage/PostPage.css";

const Comment = ({ comment }) => {
  const allUsers = useSelector((state) => state.usersReducer);
  const [commentUser, setCommentUser] = useState({});
  useEffect(() => {
    setCommentUser(allUsers?.filter((u) => u._id === comment.userId)[0]);
  }, [allUsers, comment]);
  return (
    <div className="user-comment">
      <Link
        to={`/Users/${commentUser?._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="avatar">
          {commentUser?.name?.charAt(0).toUpperCase()}
        </div>
      </Link>
      <span>{comment.comment}</span>
    </div>
  );
};

export default Comment;
