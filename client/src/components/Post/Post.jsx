import React, { useEffect, useState } from "react";
import "./Post.css";
import { SlOptions } from "react-icons/sl";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletedPost, dislikePost, likePost, commentPost } from "../../actions/posts";
import moment from "moment";
import { IoSend } from "react-icons/io5";
import Comment from "../Comment/Comment";
import copy from "copy-to-clipboard";

const Post = ({ post }) => {
  // console.log(post);
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [showOption, setShowOption] = useState(false);
  const [commentText, setCommentText] = useState();
  const users = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(users);
  useEffect(() => {
    users.filter((u) => u._id === post?.userId && setUser(u));
  }, [post, users]);
  // console.log(user);

  const setLikePost = () => {
    if (currentUser) {
      dispatch(likePost(post._id));
    } else {
      alert("Please login!");
    }
  };

  const setdisLikePost = () => {
    if (currentUser) {
      dispatch(dislikePost(post._id));
    } else {
      alert("Please login!");
    }
  };

  const deletePost = () => {
    dispatch(deletedPost(post._id));
    setShowOption(false);
  };

  const postComment = () => {
    setCommentText("");
    if (currentUser) {
      commentText
        ? dispatch(commentPost(post._id, commentText))
        : alert("Type a comment");
    } else {
      alert("Please login!");
    }
  };

  const navigateToPostPage = () => {
    navigate(`/stack-community/post/${post._id}`);
    setShowOption(false);
  };

  const handleShare = () => {
    const url =
      window.location.origin + "/stack-community/post/" + post._id;
    copy(url);
    alert("Copied url : " + url);
    setShowOption(false);
  };

  return (
    <div className="post-container">
      <div className="header">
        <div className="left-header">
          <Link to={`/Users/${user?._id}`} style={{ textDecoration: "none" }}>
            <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          </Link>
          <div className="text">
            <span>
              <Link
                to={`/Users/${user?._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {user?.name}
              </Link>
            </span>
            <span>{moment(post?.createdAt).fromNow()}</span>
          </div>
        </div>
        {/* --- delete option --- */}
        <div className="option">
          <SlOptions
            onClick={() => setShowOption(!showOption)}
            style={{ cursor: "pointer", marginRight: "5px" }}
          />
          {showOption && (
            <div className="option_box">
              {post.userId === currentUser?.result._id && (
                <span onClick={deletePost}>Delete</span>
              )}
              <span onClick={navigateToPostPage}>Go to Post</span>
              <span onClick={handleShare}>Share</span>
            </div>
          )}
        </div>
      </div>
      <div className="post-file-box">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt="post" className="post-file" />
        ) : (
          post.videoUrl && (
            <video
              src={post.videoUrl}
              alt="post"
              controls
              className="post-file"
            />
          )
        )}
        {post?.desc && (
          <p className="desc">
            <span>{user?.name}</span>
            {": "}
            {post.desc}
          </p>
        )}
      </div>
      <div className="footer">
        <div className="buttons">
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            {post?.likes?.includes(currentUser?.result._id) ? (
              <AiFillLike className="like-button" onClick={setdisLikePost} />
            ) : (
              <AiOutlineLike onClick={setLikePost} />
            )}
            <span style={{ marginLeft: "2px" }}>{post.likes.length}</span>
          </div>
          <GoComment onClick={navigateToPostPage} />
          <CiShare2 onClick={handleShare} />
        </div>
      </div>
      <div className="comment-box">
        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={postComment}>
            <IoSend className="send-button" />
          </button>
        </div>
        <div className="post-comments">
          {post.comments?.length === 0 && (
            <p style={{ fontSize: "14px", padding: "0 10px" }}>No comments</p>
          )}
          {post.comments?.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
