import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import decode from "jwt-decode";

import Avatar from '../Avatar/Avatar';

import logo from '../../assets/logo.png';
import search from '../../assets/search-icon.svg' 

import './Navbar.css'

function Navbar() {
    
    const dispatch = useDispatch();
    var User = useSelector((state) => (state.currentUserReducer));
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        dispatch(setCurrentUser(null));
    }

    useEffect(() => {
        const token = User?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                const handleLogOut = () => {
                    dispatch({ type: "LOGOUT" });
                    navigate("/");
                    dispatch(setCurrentUser(null));
                }
                handleLogOut();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    },[dispatch, navigate, User?.token]);

    return (
        <nav className="main-nav">
            <div className="navbar">
                <Link to="/" className="nav-item nav-logo">
                    <img src={logo} alt="logo" height="25"/>
                </Link>
                <Link to="/" className="nav-item nav-btn">About</Link>
                <Link to="/" className="nav-item nav-btn">Products</Link>
                <Link to="/" className="nav-item nav-btn">For Teams</Link>
                <form>
                    <input type="text" placeholder="Search..."/>
                    <img className="search-icon" src={search} alt="search" height="18" />
                </form>
                {User === null ?
                    <Link to="/Auth" className="nav-item nav-links">Log in</Link>
                    :
                    <>
                        <Avatar fontSize="14px" backgroundColor="#009dff" px="12px" py="7px" borderRadius="50%">
                            <Link to={`/Users/${User?.result?._id}`} style={{ color: "white", textDecoration: "none" }}>
                                { User.result.name.charAt(0).toUpperCase() }
                            </Link>
                        </Avatar>
                        <button className="nav-item nav-links" onClick={handleLogOut}>Log out</button>
                    </>
                }
            </div>
        </nav>
    );
}

export default Navbar;