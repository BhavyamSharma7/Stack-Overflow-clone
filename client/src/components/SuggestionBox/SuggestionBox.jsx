import React from "react";
import "./SuggestionBox.css";
import { useSelector } from "react-redux";
import MiniProfile from "./MiniProfile";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SuggestionBox = () => {
  const usersList = useSelector((state) => state.usersReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [searchItem, setSearchItem] = useState("");
  return (
    <div className="side-box">
      <span className="title">Suggestion for you</span>
      <div className="user-searchbar">
        <input
          type="text"
          placeholder="Find friends..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <AiOutlineSearch className="search-icon" />
      </div>
      <div className="list">
        {searchItem === ""
          ? usersList
              ?.filter((u) => u._id !== currentUser?.result._id)
              .splice(0, 5)
              .map((user) => {
                return (
                  <MiniProfile
                    user={user}
                    key={user._id}
                    currentUserId={currentUser?.result._id}
                  />
                );
              })
          : usersList
              ?.filter(
                (u) =>
                  u._id !== currentUser?.result._id &&
                  u.name.toLowerCase().includes(searchItem.toLowerCase())
              )
              .splice(0, 5)
              .map((user) => {
                return (
                  <MiniProfile
                    user={user}
                    key={user._id}
                    currentUserId={currentUser?.result._id}
                  />
                );
              })}
      </div>
    </div>
  );
};

export default SuggestionBox;
