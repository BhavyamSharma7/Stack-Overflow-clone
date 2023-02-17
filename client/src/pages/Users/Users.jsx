import React from "react";
import LeftSidebar from "../../components/LeftSideBar/LeftSideBar";
// import { useLocation } from "react-router-dom";
import UsersList from "./UsersList";
import "./Users.css";

const Users = () => {

    return (
        <div className="home-container-1">
            <LeftSidebar />
            <div className="home-container-2">
                <UsersList />
            </div>
        </div>
    );
}

export default Users;
