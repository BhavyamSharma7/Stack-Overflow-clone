import React from "react";
import { Link } from "react-router-dom";
import "./SuggestionBox.css";
import { fetchAllUsers, followUser, unfollowUser } from "../../actions/users";
import { useDispatch } from "react-redux";
import { useState } from "react";

const MiniProfile = ({ user, currentUserId }) => {
  const [followed, setFollowed] = useState(
    user.followers.includes(currentUserId)
  );
  const dispatch = useDispatch();

  const followingUser = async (userid) => {
    dispatch(followUser(userid));
    dispatch(fetchAllUsers());
    setFollowed(true);
  };

  const unfollowingUser = async (userid) => {
    dispatch(unfollowUser(userid));
    dispatch(fetchAllUsers());
    setFollowed(false);
  };
  return (
    <div className="profile" key={user._id}>
      <Link to={`/Users/${user._id}`} className="image">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
      </Link>
      <Link to={`/Users/${user._id}`} className="username">
        <span>{user.name}</span>
      </Link>
      {followed ? (
        <button onClick={() => unfollowingUser(user._id)}>Unfollow</button>
      ) : (
        <button onClick={() => followingUser(user._id)}>Follow</button>
      )}
    </div>
  );
};

export default MiniProfile;
