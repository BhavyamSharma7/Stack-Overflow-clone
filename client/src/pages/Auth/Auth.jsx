import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';

import icon from '../../assets/icon.png';
import AboutAuth from "./AboutAuth";

import './Auth.css';
import { signup, login } from "../../actions/auth";

const Auth = () => {
    
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter Email/Password!!");
        }
        if (isSignup) {
            if (!name) {
                alert("Enter a name to display!");
                return;
            }
            console.log({ name, email, password });
            dispatch(signup({ name, email, password}, navigate));
        }
        console.log({ email, password });
        dispatch(login({ email, password }, navigate));
    }

    return (
        <section className="auth-section">
            {isSignup && (
                <AboutAuth/>
            )}
            <div className="auth-container-2">
                {!isSignup && <img src={icon} alt="stack overflow" height="65px"/>}
                <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                            <label htmlFor="name">
                                <h4>Display Name</h4>
                                <input type="text" name="name" id="name" onChange={(e)=>{ setName(e.target.value)}} />
                            </label>
                        )
                    }
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name="email" id="email" onChange={(e)=>{ setEmail(e.target.value)}} />
                    </label>
                    <label htmlFor="password">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h4>Password</h4>
                            { !isSignup && <p style={{color: "#007ac6", fontSize: "13px", cursor: "pointer"}}>Forgot password?</p>}
                        </div>
                        <input type="password" name="password" id="password" onChange={(e)=>{ setPassword(e.target.value)}} />
                        {isSignup && (
                            <p style={{color: "#666767", fontSize: "13px"}}>The password must contain atleast eight<br/> characters, including atleast 1 number and 1<br/> letter.</p>
                        )}
                    </label>
                    {
                        isSignup && (
                            <label htmlFor="check">
                                <input type="checkbox" id="check" />
                                <p style={{color: "#666767", fontSize: "13px"}}>Opt-in to recieve ocassional <br /> product updates, user research invitations,<br /> company announcments, and digests.</p>
                            </label>
                        )
                    }
                    <button type="submit" className="auth-btn">{ isSignup ? "Sign up" : "Log in"}</button>
                    {isSignup && (
                        <p style={{color: "#666767", fontSize: "13px"}}>
                            By clicking "Sign up", you agree to our<br />
                            <span style={{color: "#007ac6", cursor: "pointer"}}> terms of service</span>,
                            <span style={{color: "#007ac6", cursor: "pointer"}}> privacy policy</span> and
                            <span style={{color: "#007ac6", cursor: "pointer"}}> cookie policy</span>.
                        </p>
                    )}
                </form>
                <p>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button className="handle-switch-btn" onClick={handleSwitch}>{ isSignup ? "Log in" : "Sign up"}</button>
                </p>
            </div>
        </section>
    );
}

export default Auth;