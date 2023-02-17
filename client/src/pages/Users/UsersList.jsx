import React from 'react';
import { useSelector } from "react-redux";
import User from "./User";
import "./Users.css";

const UsersList = () => {

    const users = useSelector((state) => state.usersReducer);
    return (
        <div className="userList-container">
            <h1 style={{fontWeight: "400"}}>Users</h1>
            {
                users.map((user) => (
                    <User user={user} key={ user?._id } />
                ))
            }
        </div>
    );
}

export default UsersList;
